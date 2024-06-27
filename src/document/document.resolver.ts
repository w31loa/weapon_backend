import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DocumentService } from './document.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/common/guards/gql-jwt-auth.guard';
import { CreateDocumentInput } from './dto/create-document.input';
import { Document } from './models/document.model';
import { UpdateDocumentInput } from './dto/update-document.input';

@Resolver()
export class DocumentResolver {

    constructor(private readonly documentService: DocumentService) { }

    @UseGuards(GqlJwtAuthGuard)
    @Mutation(() => Document)
    createDocument(
        @Args('createDocumentInput') createDocumentInput: CreateDocumentInput,
    ): Promise<Document> {
        return this.documentService.create(createDocumentInput);
    }

    @Query(() => [Document], { name: 'documents' })
    findAll(
        @Args('take', { type: () => Int, nullable: true }) take?: number,
        @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    ): Promise<Document[]> {
        return this.documentService.findAll(take, skip);
    }

    @Query(() => Document, { name: 'document' })
    findOne(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<Document | null> {
        return this.documentService.findOne(id);
    }
    
    @UseGuards(GqlJwtAuthGuard)
    @Mutation(() => Document)
    updateDocument(
      @Args('updateDocumentInput') updateDocumentInput: UpdateDocumentInput,
    ): Promise<Document | null> {
      return this.documentService.update(
        updateDocumentInput.id,
        updateDocumentInput,
      );
    }
    
    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [Document], { name: 'getDocuments', nullable: true })
    getDocuments(
      @Args('id', { type: () => [Int] }) id: number[],
    ): Promise<Document[] | Document | null> {
      return this.documentService.getDocument(id);
    }
  
    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [Document], { name: 'getDocument', nullable: true })
    getDocument(
      @Args('id', { type: () => Int }) id: number,
    ): Promise<Document[] | Document | null> {
      return this.documentService.getDocument(id);
    }

}
