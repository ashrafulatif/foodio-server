import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MenuItemModule } from './modules/menu-item/menu-item.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    OrdersModule,
    CategoriesModule,
    MenuItemModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
