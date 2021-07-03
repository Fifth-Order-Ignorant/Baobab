import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Req,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { Response } from 'express';
import { CreateTeamRequest } from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('team')
export class TeamController {
  constructor(private _teamService: TeamService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({ status: 201, description: 'The team is created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'Team name exists.' })
  createTeam(
    @Body() reqBody: CreateTeamRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    const today = new Date();

    if (this._teamService.teamExists(reqBody.teamName)) {
      throw new ConflictException({
        errors: [],
      });
    }

    const team = this._teamService.createTeam(
      req.user.id,
      today,
      reqBody.teamName,
    );

    if (!team) {
      throw new InternalServerErrorException({
        errors: [],
      });
    }
  }
}
