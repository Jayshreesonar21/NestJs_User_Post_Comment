import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // If we want to use another property instead of req.user after login successfull
  // constructor() {
  //   super({
  //     property: 'owner',
  //   });
  // }
}
