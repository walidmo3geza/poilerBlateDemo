﻿using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Demo.Configuration.Dto;

namespace Demo.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : DemoAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
