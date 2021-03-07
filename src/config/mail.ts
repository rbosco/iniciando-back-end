interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'romulo.bbosco@gmail.com',
      name: 'Rômulo Basilio Bosco',
    },
  },
} as IMailConfig;
