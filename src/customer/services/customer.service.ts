import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../interface/customer.interface';
import { CreateCustomerDTO } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  public async listCustomer(): Promise<Customer[]> {
    return await this.customerModel.find({});
  }

  public async createCustomer(customer: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = await new this.customerModel(customer);
    return newCustomer.save();
  }

  public async updateCustomer(
    id,
    customerDto: Partial<CreateCustomerDTO>,
  ): Promise<Customer> {
    const updateCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      customerDto,
      { new: true },
    );
    return updateCustomer;
  }

  public async getCustomer(id: string): Promise<Customer[]> {
    return await this.customerModel.findById(id);
  }

  public async removeCustomer(id: string): Promise<Customer[]> {
    return await this.customerModel.findByIdAndRemove(id);
  }
}
