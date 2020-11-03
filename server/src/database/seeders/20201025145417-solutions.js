module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Solutions',
      [
        {
          sensor: 'fuel',
          description: 'Parar no posto mais próximo para abastecer o tanque de combustível.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'odometer',
          description: 'O odômetro já chegou na quilometragem estabelecida.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'odometer',
          description: 'Verificar as configurações do odômetro no aplicativo.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'oil',
          description: 'Verificar o nivél do óleo.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'oil',
          description: 'Verificar a validade do óleo.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'oil',
          description: 'Verificar se há algum vazamento.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'brake',
          description: 'Verificar as condições das pastilhas de freio.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'brake',
          description: 'Trocar as pastilhas de freio.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'temperature',
          description: 'Verificar o nivél da água no radiador e adicionar caso seja necessário.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rfTirePressure',
          description: 'Verificar se não há algum objeto estranho no pneu.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rfTirePressure',
          description: 'Parar no posto mais próximo para calibrar os pneus.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'lfTirePressure',
          description: 'Verificar se não há algum objeto estranho no pneu.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'lfTirePressure',
          description: 'Parar no posto mais próximo para calibrar os pneus.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rrTirePressure',
          description: 'Verificar se não há algum objeto estranho no pneu.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rrTirePressure',
          description: 'Parar no posto mais próximo para calibrar os pneus.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rlTirePressure',
          description: 'Verificar se não há algum objeto estranho no pneu.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rlTirePressure',
          description: 'Parar no posto mais próximo para calibrar os pneus.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rfTireTemp',
          description: 'Verificar as condições do pneu.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rfTireTemp',
          description: 'Trocar por pneus novos.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          sensor: 'lfTireTemp',
          description: 'Verificar as condições do pneu.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'lfTireTemp',
          description: 'Trocar por pneus novos.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          sensor: 'rrTireTemp',
          description: 'Verificar as condições do pneu.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rrTireTemp',
          description: 'Trocar por pneus novos.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          sensor: 'rlTireTemp',
          description: 'Verificar as condições do pneu.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sensor: 'rlTireTemp',
          description: 'Trocar por pneus novos.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Solutions', null, {});
  },
};
