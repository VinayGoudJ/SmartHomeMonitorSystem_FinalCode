// // import * as React from 'react';
// // import * as ReactDom from 'react-dom';
// // import { Version } from '@microsoft/sp-core-library';
// // import {
// //   type IPropertyPaneConfiguration,
// //   PropertyPaneTextField
// // } from '@microsoft/sp-property-pane';
// // import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// // import { IReadonlyTheme } from '@microsoft/sp-component-base';

// // import * as strings from 'MotionSensorWebPartWebPartStrings';
// // import MotionSensorWebPart from './components/MotionSensorComponent';
// // import { IMotionSensorWebPartProps } from './components/IMotionSensorWebPartProps';

// // export interface IMotionSensorWebPartWebPartProps {
// //   description: string;
// // }

// // export default class MotionSensorWebPartWebPart extends BaseClientSideWebPart<IMotionSensorWebPartWebPartProps> {

// //   private _isDarkTheme: boolean = false;
// //   private _environmentMessage: string = '';

// //   public render(): void {
// //     const element: React.ReactElement<IMotionSensorWebPartProps> = React.createElement(
// //       MotionSensorWebPart,
// //       {
// //         description: this.properties.description,
// //         isDarkTheme: this._isDarkTheme,
// //         environmentMessage: this._environmentMessage,
// //         hasTeamsContext: !!this.context.sdks.microsoftTeams,
// //         userDisplayName: this.context.pageContext.user.displayName
// //       }
// //     );

// //     ReactDom.render(element, this.domElement);
// //   }

// //   protected onInit(): Promise<void> {
// //     return this._getEnvironmentMessage().then(message => {
// //       this._environmentMessage = message;
// //     });
// //   }



// //   private _getEnvironmentMessage(): Promise<string> {
// //     if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
// //       return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
// //         .then(context => {
// //           let environmentMessage: string = '';
// //           switch (context.app.host.name) {
// //             case 'Office': // running in Office
// //               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
// //               break;
// //             case 'Outlook': // running in Outlook
// //               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
// //               break;
// //             case 'Teams': // running in Teams
// //             case 'TeamsModern':
// //               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
// //               break;
// //             default:
// //               environmentMessage = strings.UnknownEnvironment;
// //           }

// //           return environmentMessage;
// //         });
// //     }

// //     return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
// //   }

// //   protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
// //     if (!currentTheme) {
// //       return;
// //     }

// //     this._isDarkTheme = !!currentTheme.isInverted;
// //     const {
// //       semanticColors
// //     } = currentTheme;

// //     if (semanticColors) {
// //       this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
// //       this.domElement.style.setProperty('--link', semanticColors.link || null);
// //       this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
// //     }

// //   }

// //   protected onDispose(): void {
// //     ReactDom.unmountComponentAtNode(this.domElement);
// //   }

// //   protected get dataVersion(): Version {
// //     return Version.parse('1.0');
// //   }

// //   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
// //     return {
// //       pages: [
// //         {
// //           header: {
// //             description: strings.PropertyPaneDescription
// //           },
// //           groups: [
// //             {
// //               groupName: strings.BasicGroupName,
// //               groupFields: [
// //                 PropertyPaneTextField('description', {
// //                   label: strings.DescriptionFieldLabel
// //                 })
// //               ]
// //             }
// //           ]
// //         }
// //       ]
// //     };
// //   }
// // }


// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import { Version } from '@microsoft/sp-core-library';
// import {
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
// import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
// import SmartHomeDashboard from './components/SmartHomeDashboard';


// import { IMotionSensorItem } from './components/IMotionSensorItem';



// export interface IMotionSensorWebPartProps {
//   description: string;
// }

// export default class MotionSensorWebPart extends BaseClientSideWebPart<IMotionSensorWebPartProps> {

//   public render(): void {
//     const element = React.createElement(SmartHomeDashboard, {
//       context: this.context
//     });
  
//     ReactDom.render(element, this.domElement);

//     // Fetch and log list items
//     this._getListItems()
//       .then(items => console.log("Fetched items:", items))
//       .catch(error => console.error("Error fetching items:", error));

//     // Example usage of _addItem
//     const newItem: IMotionSensorItem = {
//       Id: 0, // Id will be auto-generated
//       Title: "New Sensor",
//       SensorStatus: "Active",
//       Timestamp: new Date().toISOString()
//     };

//     this._addItem(newItem).catch(error => console.error("Error adding item:", error));
//   }
  
//   private async _addItem(item: IMotionSensorItem): Promise<void> {
//     const body: string = JSON.stringify({
//       Title: item.Title,
//       SensorStatus: item.SensorStatus,
//       Timestamp: item.Timestamp
//     });
  
//     await this.context.spHttpClient.post(
//       `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MotionSensorData')/items`,
//       SPHttpClient.configurations.v1,
//       {
//         headers: {
//           'Accept': 'application/json;odata=nometadata',
//           'Content-type': 'application/json;odata=nometadata'
//         },
//         body: body
//       }
//     );
  
//     this.render(); // re-render to refresh list
//   }
  

//   private async _getListItems(): Promise<IMotionSensorItem[]> {
//     const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MotionSensorData')/items`;

//     const response: SPHttpClientResponse = await this.context.spHttpClient.get(
//       endpoint,
//       SPHttpClient.configurations.v1
//     );

//     if (!response.ok) {
//       console.error("Failed to fetch items");
//       return [];
//     }

//     const data = await response.json();
//     return data.value.map((item: any) => ({
//       Id: item.Id,
//       Title: item.Title,
//       SensorStatus: item.SensorStatus,
//       Timestamp: item.Timestamp
//     }));
//   }

//   protected get dataVersion(): Version {
//     return Version.parse('1.0');
//   }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         {
//           header: {
//             description: "Motion Sensor WebPart Settings"
//           },
//           groups: [
//             {
//               groupName: "Configuration",
//               groupFields: [
//                 PropertyPaneTextField('description', {
//                   label: "Description"
//                 })
//               ]
//             }
//           ]
//         }
//       ]
//     };
//   }
// }




import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import SmartHomeDashboard from './components/SmartHomeDashboard';

import { IMotionSensorItem } from './components/IMotionSensorItem';

export interface IMotionSensorWebPartProps {
  description: string;
}

export default class MotionSensorWebPart extends BaseClientSideWebPart<IMotionSensorWebPartProps> {

  public render(): void {
    const element = React.createElement(SmartHomeDashboard, {
      context: this.context
    });

    ReactDom.render(element, this.domElement);

    // Optional: Only fetch items for logging or view
    this._getListItems()
      .then(items => console.log("Fetched items:", items))
      .catch(error => console.error("Error fetching items:", error));
  }

  // 🔍 Only used for reading/listing data
  private async _getListItems(): Promise<IMotionSensorItem[]> {
    const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MotionSensorData')/items`;

    const response: SPHttpClientResponse = await this.context.spHttpClient.get(
      endpoint,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      console.error("Failed to fetch items");
      return [];
    }

    const data = await response.json();
    return data.value.map((item: any) => ({
      Id: item.Id,
      Title: item.Title,
      SensorStatus: item.SensorStatus,
      Timestamp: item.Timestamp
    }));
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Motion Sensor WebPart Settings"
          },
          groups: [
            {
              groupName: "Configuration",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Description"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
