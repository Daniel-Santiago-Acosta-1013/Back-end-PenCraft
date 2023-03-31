import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_company: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
