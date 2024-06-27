import { Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Document } from './models/document.model';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-file')
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Document> {
    return this.documentService.uploadFile(file);
  }

  @Post('upload-files')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: [Express.Multer.File]): Promise<Document[]> {
    return this.documentService.uploadFiles(files);
  }
}
