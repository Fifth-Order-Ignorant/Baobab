import {
  InternalServerErrorException,
  Body,
  Controller,
  Post,
  Get,
  Query,
  Req,
  Patch,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RequestService } from '../services/request.service';
import {
  RoleRequest,
  RequestPaginationRequest,
  RoleRequestResponse,
  EditRoleRequest,
} from 'baobab-common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuth } from './jwt.decorator';
import { Role } from '../entities/role.entity';
import { Request } from '../entities/request.entity';

import { UserProfileService } from '../services/userprofile.service';

@Controller('request')
export class RequestController {
  constructor(
    private _requestService: RequestService,
    private _userProfileService: UserProfileService,
  ) {}

  @JwtAuth()
  @Post('role')
  @ApiResponse({ status: 201, description: 'The role is returned.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async requestRole(@Body() reqBody: RoleRequest, @Req() req) {
    const today = new Date();

    if (!Object.values<string>(Role).includes(reqBody.role)) {
      throw new BadRequestException({
        errors: [],
      });
    }

    const request = this._requestService.createRequest(
      req.user.id,
      reqBody.description,
      today,
      reqBody.role as Role,
    );

    if (!request) {
      throw new InternalServerErrorException({
        errors: [],
      });
    }
  }

  @Get('pagination')
  async pagination(
    @Query() query: RequestPaginationRequest,
  ): Promise<RoleRequestResponse[]> {
    const paginatedRequests: Request[] = await this._requestService.getRequests(
      query.start,
      query.end,
    );

    const ans: RoleRequestResponse[] = [];

    for (const request of paginatedRequests) {
      ans.push({
        requestId: request.id,
        userId: request.userId,
        name: await this._userProfileService.getFullName(request.userId),
        role: request.role as string,
        description: request.description,
      });
    }
    return ans;
  }

  @ApiResponse({ status: 200, description: 'Role is updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Patch('approve')
  async editRole(@Body() reqBody: EditRoleRequest) {
    const requestId = reqBody.requestId;
    if (!(await this._requestService.isPendingRequest(requestId))) {
      throw new BadRequestException({
        errors: [],
      });
    } else {
      if (reqBody.isApproved) {
        const details: [number, string] =
          await this._requestService.approveRequest(requestId);
        if (await this._userProfileService.isValidProfile(details[0])) {
          if (this._userProfileService.isValidRole(details[1])) {
            await this._userProfileService.editRole(details[0], details[1]);
          } else {
            throw new BadRequestException({
              errors: [new NotFoundException('Role is not found', details[1])],
            });
          }
        } else {
          throw new BadRequestException({
            errors: [],
          });
        }
      } else {
        await this._requestService.rejectRequest(requestId);
      }
    }
  }
}
