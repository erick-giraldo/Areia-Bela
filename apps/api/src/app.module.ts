import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Phase 5: Register modules as they are implemented
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { PropertiesModule } from './properties/properties.module';
// import { RoomsModule } from './rooms/rooms.module';
// import { ReservationsModule } from './reservations/reservations.module';
// import { PaymentsModule } from './payments/payments.module';
// import { ReviewsModule } from './reviews/reviews.module';
// import { AvailabilityModule } from './availability/availability.module';
// import { CouponsModule } from './coupons/coupons.module';
// import { ChannelManagerModule } from './channel-manager/channel-manager.module';
// import { EmailModule } from './email/email.module';
// import { FinanceModule } from './finance/finance.module';
// import { CheckinModule } from './checkin/checkin.module';
// import { AIRecommendationModule } from './ai/recommendation.module';
// import { AIPricingModule } from './ai/pricing.module';
// import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // AuthModule,
    // UsersModule,
    // PropertiesModule,
    // RoomsModule,
    // ReservationsModule,
    // PaymentsModule,
    // ReviewsModule,
    // AvailabilityModule,
    // CouponsModule,
    // ChannelManagerModule,
    // EmailModule,
    // FinanceModule,
    // CheckinModule,
    // AIRecommendationModule,
    // AIPricingModule,
    // ChatModule,
  ],
})
export class AppModule {}
