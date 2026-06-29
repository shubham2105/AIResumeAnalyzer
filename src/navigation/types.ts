export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined
};

export type AppTabsParamList = {
    Home: undefined;
    Upload: undefined;
    History: undefined;
    Profile: undefined;
};

export type DrawerParamList = {
    Tabs: undefined;
    Settings: undefined;
};

export type AppStackParamList = {
    Main: undefined;

    Processing:{
        resumeId: string;
    };
    AnalysisResult:{
        analysisId: string;
    };
    ResumeDetail:{
        resumeId: string;
    }
}

