export interface IFeatureFlagAdditionalInput {
  type: 'dropdown';

  options: number[];
}

export interface IFeatureFlag {
  title: string;

  childFeatureFlags?: this[];

  additionalInput?: IFeatureFlagAdditionalInput
}

export interface ISection {
  title: string;

  featureFlagGroups: IFeatureFlag[][];
}

export interface ISchema {
  sections: ISection[]
}
