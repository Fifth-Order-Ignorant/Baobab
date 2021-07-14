import {
  InternalServerErrorException,
  Body,
  Controller,
  Post,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { RequestService } from '../services/request.service';
import { Response } from 'express';
import { RoleRequest, RequestPaginationRequest } from 'baobab-common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuth } from './jwt.decorator';
import { Role } from '../entities/role.entity';
import { Request } from '../entities/request.entity';

@Controller('request')
export class RequestController {
  constructor(private _requestService: RequestService) {}

  @JwtAuth()
  @Post('role')
  @ApiResponse({ status: 201, description: 'The role is returned.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async requestRole(
    @Body() reqBody: RoleRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
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

  @Post('pagination')
  async pagination(
    @Body() reqBody: RequestPaginationRequest,
  ): Promise<Request[]> {
    const paginatedRequests: Request[] = await this._requestService.getRequests(
      reqBody.start,
      reqBody.end,
    );
    return paginatedRequests;
  }

  // @ApiResponse({ status: 200, description: 'Role is updated.' })
  // @ApiResponse({ status: 400, description: 'Bad Request.' })
  // @Patch('approve')
  // async editRole(
  //   @Body() reqBody: EditRoleRequest,
  //   @Res({ passthrough: true }) res: Response,
  //   @Req() req,
  // ) {
  //   const id = req.user.id;
  //   if (await this._userProfileService.isValidProfile(id)) {
  //     if (this._userProfileService.isValidRole(reqBody.role)) {
  //       await this._userProfileService.editRole(id, reqBody.role);
  //     } else {
  //       throw new BadRequestException({
  //         errors: [new NotFoundException('Role is not found', reqBody.role)],
  //       });
  //     }
  //   } else {
  //     throw new BadRequestException({
  //       errors: [],
  //     });
  //   }
  // }
}
