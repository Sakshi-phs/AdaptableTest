@Library('eagle-jenkins-pipeline') _

pipeline_WebappV2 {
    projectName = 'ui-angular-basic'
    browserVersion='chrome-88.0'
    gradleExtraParams = ""
    repoName = 'ce-git-template-angular-basic'
    nodeValue = 'JS_MED'
    dnsAppName = 'angular-basic'
    prepareTasks = ['clean', 'npm_ci']
    buildTasksV2 = [
        ['npm run lint:build'],
        ['npm run test:e2e:prep'],
        ['npm run build', 'npm run storybook:build', 'npm run analyze:build:quick'],
        ['npm run docs:generate'],
        ['npm run stylelint:build'],
        ['npm run prettier:build']
    ]
    slackChannel = "_chatsandbox"
    karmaRunType = 'puppeteer'
    e2eAcceptTests = ['.*acceptance.spec.tp.ts']
    vaultBuildSecrets = [
        [key: "USER_E2E_PWD", envName: "USER_E2E_PWD"],
        [key: "UD_USER_NAME_INDEX", envName: "UD_USER_NAME_INDEX"],
        [key: "UD_USER_NAME_1_MFA", envName: "UD_USER_NAME_1_MFA"],
        [key: "UD_USER_NAME_2_MFA", envName: "UD_USER_NAME_2_MFA"],
        [key: "UD_USER_NAME_4_MFA", envName: "UD_USER_NAME_4_MFA"],
        [key: "UD_USER_NAME_5_MFA", envName: "UD_USER_NAME_5_MFA"],
        [key: "UD_USER_NAME_INDEX_1_MFA_B2C", envName: "UD_USER_NAME_INDEX_1_MFA_B2C"],
        [key: "UD_USER_NAME_INDEX_2_MFA_B2C", envName: "UD_USER_NAME_INDEX_2_MFA_B2C"],
        [key: "UD_USER_NAME_INDEX_4_MFA_B2C", envName: "UD_USER_NAME_INDEX_4_MFA_B2C"],
        [key: "UD_USER_NAME_INDEX_5_MFA_B2C", envName: "UD_USER_NAME_INDEX_5_MFA_B2C"]
    ]
    slack = [
        slackDirectMsgFail: true,
        channelMap: ['develop': '_chatsandbox'],
        onFailure: [use: true],
        onSuccess: [use: true]
    ]
    useSonarV2 = true
    sonarAngularMultiProjects = ['angular-basic-app']
    imageTestingFail = true
    useHarness = true
    useUiE2eAppsUrl = true
}

