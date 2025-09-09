/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [],
      controllers: [
        [
          import('./items/items.controller'),
          { ItemsController: { index: {}, show: {} } },
        ],
        [
          import('./health/health.controller'),
          { HealthController: { check: {} } },
        ],
        [
          import('./root/root.controller'),
          { RootController: { index: {}, throwError: {} } },
        ],
        [
          import('./exchanges/exchanges-admin.controller'),
          {
            ExchangesAdminController: {
              createExchange: {},
              listExchanges: {},
              getExchange: {},
              updateExchange: {},
              deleteExchange: {},
            },
          },
        ],
        [
          import('./exchanges/exchanges.controller'),
          {
            ExchangesController: {
              listExchangesRoot: {},
              listExchangesMM: {},
              listExchangesES: {},
            },
          },
        ],
        [
          import('./regions/regions-admin.controller'),
          {
            RegionsAdminController: {
              createRegion: {},
              listRegions: {},
              getRegion: {},
              updateRegion: {},
              deleteRegion: {},
            },
          },
        ],
        [
          import('./bot-commands/bot-commands-admin.controller'),
          {
            BotCommandsAdminController: {
              createBotCommand: {},
              listBotCommands: {},
              getBotCommand: {},
              updateBotCommand: {},
              deleteBotCommand: {},
            },
          },
        ],
        [
          import('./bug-reports/bug-reports.controller'),
          { BugReportsController: { createBugReport: { type: Object } } },
        ],
        [
          import('./marketing-campaigns/marketing-campaigns-admin.controller'),
          {
            MarketingCampaignsAdminController: {
              createMarketingCampaign: {},
              listMarketingCampaigns: {},
              getMarketingCampaign: {},
              updateMarketingCampaign: {},
              deleteMarketingCampaign: {},
            },
          },
        ],
        [
          import('./marketing-campaigns/marketing-campaigns.controller'),
          { MarketingCampaignsController: { getMarketingCampaignBySlug: {} } },
        ],
        [
          import('./users/users.controller'),
          { UsersController: { listUsers: {} } },
        ],
      ],
    },
  };
};
