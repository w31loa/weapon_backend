import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(
      async (
        params: Prisma.MiddlewareParams,
        next: (params: Prisma.MiddlewareParams) => Promise<any>,
      ) => {
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          params.action = 'findFirst';
          if (params.args.where.deleted_at === 'all') params.args.where.deleted_at = undefined;
          else params.args.where.deleted_at = null;
        }
        if (params.action === 'findMany') {
          if (params.args.where) {
            if (params.args.where.deleted_at === undefined) {
              params.args.where.deleted_at = null;
            }
          } else {
            params.args.where = { deleted_at: null };
          }
        }

        if (params.action === 'update') {
          params.action = 'updateMany';

          if (!params.args.where.deleted_at) {
            params.args.where.deleted_at = null;
          }
        }
        if (params.action === 'updateMany') {
          if (params.args.where !== undefined && !params.args.where.deleted_at) {
            params.args.where.deleted_at = null;
          } else {
            params.args.where = { deleted_at: null };
          }
        }

        if (params.action === 'delete') {
          params.action = 'update';
          params.args.data = { deleted_at: new Date() };
        }
        if (params.action === 'deleteMany') {
          params.action = 'updateMany';
          if (params.args.data !== undefined) {
            params.args.data.deleted_at = new Date();
          } else {
            params.args.data = { deleted_at: new Date() };
          }
        }
        return next(params);
      },
    );
  }

  
}
