import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pivot, PivotItem, Stack, TextField, PrimaryButton, Label } from '@fluentui/react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface ISmartHomeDashboardProps {
  context: any;
}

export interface IItem {
  Id: number;
  Title: string;
  Timestamp?: string;
  Location?: string;
  MotionDetected?: boolean;
  AlertSent?: boolean;
  Temperature?: string;
  Event?: string;
  Status?: string;
}

const SmartHomeDashboard: React.FC<ISmartHomeDashboardProps> = ({ context }) => {
  const [motionData, setMotionData] = useState<IItem[]>([]);
  const [temperatureData, setTemperatureData] = useState<IItem[]>([]);
  const [securityLogs, setSecurityLogs] = useState<IItem[]>([]);
  const [newMotion, setNewMotion] = useState<IItem>({ Id: 0, Title: '', Timestamp: '', Location: '' });
  const [showForm, setShowForm] = useState(false);

  const fetchListItems = async (listName: string): Promise<IItem[]> => {
    const response: SPHttpClientResponse = await context.spHttpClient.get(
      `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
      SPHttpClient.configurations.v1
    );
    const data = await response.json();
    return data.value;
  };

  // const addMotionItem = async () => {
  //   const body = JSON.stringify({
  //     Title: newMotion.Title,
  //     Timestamp: newMotion.Timestamp,
  //     Location: newMotion.Location,
  //     MotionDetected: true,
  //     AlertSent: true
  //   });

  //   await context.spHttpClient.post(
  //     `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MotionSensorData')/items`,
  //     SPHttpClient.configurations.v1,
  //     {
  //       headers: {
  //         'Accept': 'application/json;odata=nometadata',
  //         'Content-type': 'application/json;odata=nometadata'
  //       },
  //       body
  //     }
  //   );

  //   setNewMotion({ Id: 0, Title: '', Timestamp: '', Location: '' });
  //   setShowForm(false);
  //   loadAllData();
  // };

  const addMotionItem = async () => {
    console.warn("🚫 Item creation temporarily disabled for debugging.");
    return;
  
    const body = JSON.stringify({
      Title: newMotion.Title,
      Timestamp: newMotion.Timestamp,
      Location: newMotion.Location,
      MotionDetected: true,
      AlertSent: true
    });
  
    await context.spHttpClient.post(
      `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MotionSensorData')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=nometadata'
        },
        body
      }
    );
  
    setNewMotion({ Id: 0, Title: '', Timestamp: '', Location: '' });
    setShowForm(false);
    loadAllData();
  };
  

  const loadAllData = async () => {
    const [motion, temp, logs] = await Promise.all([
      fetchListItems('MotionSensorData'),
      fetchListItems('TemperatureData'),
      fetchListItems('SecurityLogs')
    ]);
    setMotionData(motion);
    setTemperatureData(temp);
    setSecurityLogs(logs);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🏡 Smart Home Monitoring Dashboard</h1>
      <Pivot>
        {/* MOTION SENSOR TAB */}
        <PivotItem headerText="Motion Sensor">
          <Stack tokens={{ childrenGap: 20 }}>
            <div>
              <Label
                style={{ cursor: 'pointer', color: '#4a4aff', fontWeight: 600 }}
                onClick={() => setShowForm(!showForm)}
              >
                ➕ Add New Motion Sensor Entry
              </Label>

              {showForm && (
                <div style={{ marginTop: 10, marginBottom: 20 }}>
                  <TextField label="Title" value={newMotion.Title} onChange={(_, v) => setNewMotion({ ...newMotion, Title: v || '' })} />
                  <TextField label="Location" value={newMotion.Location} onChange={(_, v) => setNewMotion({ ...newMotion, Location: v || '' })} />
                  <TextField label="Timestamp" value={newMotion.Timestamp} onChange={(_, v) => setNewMotion({ ...newMotion, Timestamp: v || '' })} />
                  <PrimaryButton text="Add Entry" onClick={addMotionItem} style={{ marginTop: 10 }} />
                </div>
              )}
            </div>

            <Label>📋 Recent Motion Events</Label>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Motion Detected</th>
                  <th>Alert Sent</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {motionData.slice(-5).reverse().map(item => (
                  <tr key={item.Id}>
                    <td>{item.Id}</td>
                    <td>{item.Title}</td>
                    <td>{item.Location}</td>
                    <td>{item.MotionDetected ? '✅' : '❌'}</td>
                    <td>{item.AlertSent ? '✅' : '❌'}</td>
                    <td>{item.Timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Stack>
        </PivotItem>

        {/* TEMPERATURE TAB */}
        <PivotItem headerText="Temperature Data">
          <Stack tokens={{ childrenGap: 10 }}>
            <Label>🌡️ Recent Temperature Records</Label>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Temperature</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {temperatureData.slice(-5).reverse().map(item => (
                  <tr key={item.Id}>
                    <td>{item.Id}</td>
                    <td>{item.Title}</td>
                    <td>{item.Temperature}</td>
                    <td>{item.Timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Stack>
        </PivotItem>

        {/* SECURITY LOGS TAB */}
        <PivotItem headerText="Security Logs">
          <Stack tokens={{ childrenGap: 10 }}>
            <Label>🔐 Recent Security Events</Label>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Event</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {securityLogs.slice(-5).reverse().map(item => (
                  <tr key={item.Id}>
                    <td>{item.Id}</td>
                    <td>{item.Title}</td>
                    <td>{item.Event}</td>
                    <td>{item.Status}</td>
                    <td>{item.Timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Stack>
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default SmartHomeDashboard;



