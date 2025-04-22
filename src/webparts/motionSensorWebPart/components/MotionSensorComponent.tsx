// // import * as React from 'react';
// // import styles from './MotionSensorWebPart.module.scss';
// // import type { IMotionSensorWebPartProps } from './IMotionSensorWebPartProps';
// // import { escape } from '@microsoft/sp-lodash-subset';

// // export default class MotionSensorWebPart extends React.Component<IMotionSensorWebPartProps> {
// //   public render(): React.ReactElement<IMotionSensorWebPartProps> {
// //     const {
// //       description,
// //       isDarkTheme,
// //       environmentMessage,
// //       hasTeamsContext,
// //       userDisplayName
// //     } = this.props;

// //     return (
// //       <section className={`${styles.motionSensorWebPart} ${hasTeamsContext ? styles.teams : ''}`}>
// //         <div className={styles.welcome}>
// //           <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
// //           <h2>Well done, {escape(userDisplayName)}!</h2>
// //           <div>{environmentMessage}</div>
// //           <div>Web part property value: <strong>{escape(description)}</strong></div>
// //         </div>
// //         <div>
// //           <h3>Welcome to SharePoint Framework!</h3>
// //           <p>
// //             The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
// //           </p>
// //           <h4>Learn more about SPFx development:</h4>
// //           <ul className={styles.links}>
// //             <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
// //             <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
// //             <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
// //             <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
// //             <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
// //             <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
// //             <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
// //           </ul>
// //         </div>
// //       </section>
// //     );
// //   }
// // }


// import * as React from 'react';
// import { useState } from 'react';
// import { IMotionSensorComponentProps } from './IMotionSensorComponentProps';
// import { IMotionSensorItem } from './IMotionSensorItem';

// const MotionSensorComponent: React.FC<IMotionSensorComponentProps> = ({ items, onAddItem }) => {
//   const [title, setTitle] = useState('');
//   const [status, setStatus] = useState('');
//   const [timestamp, setTimestamp] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newItem: IMotionSensorItem = {
//       Id: 0, // will be assigned by SharePoint
//       Title: title,
//       SensorStatus: status,
//       Timestamp: timestamp
//     };
//     onAddItem(newItem);
//     setTitle('');
//     setStatus('');
//     setTimestamp('');
//   };

//   return (
//     <div>
//       <h2>Motion Sensor Data</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//         <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
//         <input type="text" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} required />
//         <input type="text" placeholder="Timestamp" value={timestamp} onChange={e => setTimestamp(e.target.value)} required />
//         <button type="submit">Add Entry</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Status</th>
//             <th>Timestamp</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(item => (
//             <tr key={item.Id}>
//               <td>{item.Id}</td>
//               <td>{item.Title}</td>
//               <td>{item.SensorStatus}</td>
//               <td>{item.Timestamp}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MotionSensorComponent;



import * as React from 'react';
import { useState } from 'react';
import { IMotionSensorComponentProps } from './IMotionSensorComponentProps';
import { TextField, PrimaryButton, Stack, Label } from '@fluentui/react';
import { Card, CardHeader } from '@fluentui/react-components';

const MotionSensorComponent: React.FC<IMotionSensorComponentProps> = ({ items, onAddItem }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && status && timestamp) {
      onAddItem({
        Id: 0,
        Title: title,
        SensorStatus: status,
        Timestamp: timestamp
      });
      setTitle('');
      setStatus('');
      setTimestamp('');
    }
  };

  // const alerts = items.filter(item => item.SensorStatus.toLowerCase().includes('alert') || item.SensorStatus.toLowerCase().includes('motion'));
  const alerts = items.filter(item =>
    item.SensorStatus &&
    (item.SensorStatus.toLowerCase().includes('alert') ||
     item.SensorStatus.toLowerCase().includes('motion'))
  );
  
  const recent = [...items].slice(-5).reverse(); // last 5 items
  const statusCounts = {
    active: items.filter(i => i.SensorStatus?.toLowerCase() === 'active').length,
    inactive: items.filter(i => i.SensorStatus?.toLowerCase() === 'inactive').length,
    alerts: alerts.length
  };

  

  return (
    <div style={{ padding: 20, fontFamily: 'Segoe UI' }}>
      <h1>🏠 Smart Home Monitoring Dashboard</h1>

      {/* Summary Cards */}
      <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { marginBottom: 20 } }}>
        <Card>
          <CardHeader>
            <Label>Active Sensors</Label>
            <h2>{statusCounts.active}</h2>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Label>Inactive Sensors</Label>
            <h2>{statusCounts.inactive}</h2>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Label>Recent Alerts</Label>
            <h2 style={{ color: 'red' }}>{statusCounts.alerts}</h2>
          </CardHeader>
        </Card>
      </Stack>

      {/* Alerts Feed */}
      <div style={{ marginBottom: 30 }}>
        <h3>🛎️ Recent Alerts</h3>
        {alerts.slice(-5).reverse().map(alert => (
          <div key={alert.Id} style={{ padding: 8, backgroundColor: '#fff3cd', marginBottom: 5, borderRadius: 4 }}>
            <strong>{alert.SensorStatus}</strong> – {alert.Title} at {alert.Timestamp}
          </div>
        ))}
        {alerts.length === 0 && <div>No alerts found.</div>}
      </div>

      {/* Add New Sensor Record */}
      <div style={{ marginBottom: 40 }}>
        <h3>➕ Add New Sensor Record</h3>
        <form onSubmit={handleSubmit}>
          <Stack tokens={{ childrenGap: 10 }}>
            <TextField label="Title" value={title} onChange={(_, v) => setTitle(v || '')} required />
            <TextField label="Status (e.g. Active, Inactive, Alert)" value={status} onChange={(_, v) => setStatus(v || '')} required />
            <TextField label="Timestamp (e.g. 2025-04-01 10:30AM)" value={timestamp} onChange={(_, v) => setTimestamp(v || '')} required />
            <PrimaryButton type="submit" text="Add Record" />
          </Stack>
        </form>
      </div>

      {/* Recent Activity Table */}
      <div>
        <h3>📋 Recent Activity</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc' }}>ID</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Title</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Status</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(item => (
              <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.Title}</td>
                <td>{item.SensorStatus}</td>
                <td>{item.Timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MotionSensorComponent;
