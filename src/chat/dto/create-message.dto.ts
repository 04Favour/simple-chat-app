import { Transform } from "class-transformer"
import { IsNotEmpty, IsString, MinLength } from "class-validator"
export class CreateMessageDto {
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @Transform(({value})=> typeof value === 'string'? value.trim().toLowerCase(): value)
    name: string

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @Transform(({value})=> typeof value === 'string'? value.trim().toLowerCase(): value)
    text: string
}