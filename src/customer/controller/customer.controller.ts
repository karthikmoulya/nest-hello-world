import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  Req,
  Query,
  Body,
  Post,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Response } from 'express';
import { CreateCustomerDTO, CustomerParamDTO } from '../dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomers(@Res() res: Response) {
    const data = this.customerService.listCustomer();
    res.status(HttpStatus.OK).json(data);
  }

  @Post()
  async createCustomer(
    @Res() res: Response,
    @Body() customerParam: CreateCustomerDTO,
  ) {
    try {
      const data = await this.customerService.createCustomer(customerParam);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Get('/')
  async getCustomerById(@Query() param: CustomerParamDTO) {
    return await this.customerService.getCustomer(param.customerId);
  }

  @Delete('/')
  async deleteCustomerById(@Query() param: CustomerParamDTO) {
    return await this.customerService.removeCustomer(param.customerId);
  }

  @Put('/')
  async updateCustomerById(
    @Res() res: Response,
    @Body() customerParam: Partial<CreateCustomerDTO>,
    @Query('customerid') id: string,
  ) {
    const data = this.customerService.updateCustomer(id, customerParam);
    res.status(HttpStatus.OK).json(data);
  }
}
