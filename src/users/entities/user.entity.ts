import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) //No devolver password por defecto
  password: string;

  @Column()
  full_name: string;

  @Column({ default: 'user' })
  role: string; //'admin' | 'user'

  @CreateDateColumn()
  created_at: Date;
}