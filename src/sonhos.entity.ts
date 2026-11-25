import{
    Entity,
    PrimaryGeneratedColumn,
    Column
}from 'typeorm';

@Entity('sonhos')
export class Sonho{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({length:255})
    descricao!:string;

    @Column({length:255})
    meta!:string;
}