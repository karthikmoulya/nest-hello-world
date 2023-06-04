import {
  Controller,
  Get,
  Res,
  Req,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { Task } from './interface/task';
import { QueryParamDto, TaskDto, TaskParamDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = await this.taskService.getAllTasks();
    return res.status(200).send(data);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getTaskById(@Param() reqParam: TaskParamDto) {
    return await this.taskService.getTask(reqParam.id);
  }

  @Get('/filter/data')
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  async FilterTaskById(@Query() reqParam: QueryParamDto, @Res() res: Response) {
    const data = await this.taskService.filterTask(reqParam.filter);
    return res.status(200).send(data);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteTaskById(@Param() reqParam: TaskParamDto) {
    return await this.taskService.deleteTask(reqParam.id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = await this.taskService.addTask(task);
    return res.status(200).send(data);
  }
}
