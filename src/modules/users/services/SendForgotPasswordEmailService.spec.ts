import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Rômulo Bosco',
      email: 'romulo.bbosco@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'romulo.bbosco@gmail.com',
    });

    await expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'romulo.bbosco@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Rômulo Bosco',
      email: 'romulo.bbosco@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'romulo.bbosco@gmail.com',
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
