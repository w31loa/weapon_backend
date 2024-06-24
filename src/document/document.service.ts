import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateDocumentInput } from './dto/create-document.input';
import { Document } from './models/document.model';

@Injectable()
export class DocumentService {

    constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) { }

    async create(createDocumentInput: CreateDocumentInput): Promise<Document> {
        const { ...createDocument } = createDocumentInput;

        return await this.prisma.document.create({
            data: createDocument,
        });
    }

    async findAll(take?: number, skip?: number): Promise<Document[]> {
        return await this.prisma.document.findMany({ take, skip });
    }

    async remove(id: number): Promise<Document> {
        return await this.prisma.document.delete({ where: { id } });
    }


    async findOne(id: number): Promise<Document | null> {
        return await this.prisma.document.findUnique({ where: { id } });
    }

    async getDocument(id: number[] | number): Promise<Document[] | Document | null> {
        if (typeof id === 'number'){
            return this.findOne(id);
        } 
        return await this.prisma.document.findMany({ where: { id: { in: id } } });
    }


    async uploadFile(file: Express.Multer.File): Promise<Document> {
        const fileName = `${uuidv4()}${extname(file.originalname)}`;

        const destination = join(__dirname, '..', this.configService.get('STATIC_PATH'))


        fs.writeFileSync(
            `${destination}/${fileName}`,
            file.buffer,
        );

        return await this.create({
            name: fileName,
            url: `${destination}/${fileName}`,
        });
    }


}
