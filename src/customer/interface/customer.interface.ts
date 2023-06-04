import { Document } from 'mongoose';

export interface Customer extends Document {
  readonly firs_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly description: string;
  readonly created_at: Date;
}
