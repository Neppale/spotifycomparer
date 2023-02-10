import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { FindPlaylistIdsByUserIdService } from '../playlist/services/find-playlist-ids-by-user-id.service';
import { CompareProfilesByIdService } from './services/compare-profiles-by-id.service';
import { GetAccessTokenService } from '../utils/auth/services/get-access-token.service';
import { FindPlaylistTracksByIdService } from '../playlist/services/find-playlist-tracks-by-id.service';
import { FindSimilarTracksService } from '../tracks/services/find-similar-tracks.service';
import { FindMinimizedTrackService } from 'src/tracks/services/find-minimized-track.service';
import { ValidateProfileByIdService } from './services/validate-profile-by-id.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core/constants';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 3,
    }),
  ],
  controllers: [ProfileController],
  providers: [
    FindPlaylistIdsByUserIdService,
    CompareProfilesByIdService,
    GetAccessTokenService,
    FindPlaylistTracksByIdService,
    FindSimilarTracksService,
    FindMinimizedTrackService,
    ValidateProfileByIdService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
