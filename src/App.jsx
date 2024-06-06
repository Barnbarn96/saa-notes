import { useState, useRef } from 'react';

import { CORE_CONCEPTS, EXAMPLES } from './data';
import Header from './components/Header/Header';
import CoreConcept from './components/CoreConcept';
import TabButton from './components/TabButton';
import * as React from 'react'

import cluster from './assets/cluster.png';
import spread from './assets/spread.png';
import partition from './assets/partition.png';
import customEndpoint from './assets/aurora-custom-endpoint.png';
import elasticache from './assets/elasticache.png';
import globalAccelerator from './assets/global-accelerator.png';
import globalAcceleratorVsCloudFront from './assets/globalAcceleratorVsCoudFront.png';
import snowballGlacier from './assets/snowballGlacier.png';
import transFam from './assets/transferFam.png';
import dataSync from './assets/dataSync.png';
import kinesis from './assets/kinesis.png';
import sqsSnsKinesis from './assets/sqsSnsKinesis.png';
import mq from './assets/mq.png';
import ec2LaunchType from './assets/ec2LaunchType.png';
import fargate from './assets/fargate.png';
import ecsRoles from './assets/ecsRoles.png';
import appRunner from './assets/appRunner.png';
import lambdaLimit from './assets/lambdaLimit.png';
import db from './assets/db.png';
import dynamoDB from './assets/dynamoDB.png';
import dynamoDbStream from './assets/dynamoDbStream.png';
import dynamoDBGlobal from './assets/dynamoDBGlobal.png';
import dynamoDbDR from './assets/dynamoDbDR.png';
import glue from './assets/glue.png';
import lakeFormation from './assets/lakeFormation.png';
import route53Types from './assets/route53Types.png';
import cnameVsalias from './assets/cnameVsalias.png';
import ec2Tenancy from './assets/ec2Tenancy.png';
import guardDuty from './assets/guardDuty.png';
import inspector from './assets/inspector.png';
import macie from './assets/macie.png';
import './index.css';

function MainValues({ datas, onItemClick }) {
  return (
    <div>
      {datas.map((data, index) => (
        <div key={index} onClick={() => onItemClick(data.main)}>
          {data.main}
        </div>
      ))}
    </div>
  );
}

function KeysList({ keys }) {
  return (
    <ul>
      {keys.map((key, index) => (
        <li key={index}>{key}</li>
      ))}
    </ul>
  );
}

// Define a mapping of image names to their corresponding import paths
const imageMap = {
  cluster: cluster,
  spread: spread,
  partition: partition,
  customEndpoint: customEndpoint,
  elasticache: elasticache,
  globalAccelerator: globalAccelerator,
  globalAcceleratorVsCloudFront: globalAcceleratorVsCloudFront,
  snowballGlacier: snowballGlacier,
  transFam: transFam,
  dataSync: dataSync,
  kinesis: kinesis,
  sqsSnsKinesis: sqsSnsKinesis,
  mq: mq,
  ec2LaunchType: ec2LaunchType,
  fargate: fargate,
  ecsRoles: ecsRoles,
  appRunner: appRunner,
  lambdaLimit: lambdaLimit,
  db: db,
  dynamoDB: dynamoDB,
  dynamoDbStream: dynamoDbStream,
  dynamoDBGlobal: dynamoDBGlobal,
  dynamoDbDR: dynamoDbDR,
  glue: glue,
  lakeFormation: lakeFormation,
  route53Types: route53Types,
  cnameVsalias: cnameVsalias,
  ec2Tenancy: ec2Tenancy,
  guardDuty: guardDuty,
  inspector: inspector,
  macie: macie,
  // Add more image mappings as needed
};

function parseDescription(description) {
  const lines = description.split('\n');
  const elements = [];
  let inList = false;
  let listItems = [];

  lines.forEach((line, index) => {
    if (line.trim().startsWith('<ul>')) {
      inList = true;
    } else if (line.trim() === '</ul>') {
      inList = false;
      elements.push(<ul key={index}>{listItems}</ul>);
      listItems = [];
    } else if (line.startsWith('[img]')) {
      const imageName = line.substring(5); // Remove '[img]' prefix
      const imagePath = imageMap[imageName];
      if (imagePath) {
        elements.push(<img key={index} src={imagePath} alt={`Image ${index}`} className="image-style" />);
      }
    } else if (line.startsWith('[bold]')) {
      const boldText = line.substring(6); // Remove '[bold]' prefix
      elements.push(<p key={index}><strong>{boldText}</strong></p>);
    } else if (inList) {
      const listItem = line.trim().replace(/<\/?li>/g, '');
      listItems.push(<li key={listItem}>{listItem}</li>);
    } else {
      elements.push(<p key={index}>{line}</p>);
    }
  });

  return elements;
}


function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  function handleSelect(selectedButton) {
    // console.log(selectedButton)
    setSelectedTopic(selectedButton);
  }

  const [selectedParent, setSelectedParent] = useState(null);
  const initialDatas = [{
    main: 'IAM',
    child: [{
      title: 'IAM Summary',
      description: 'Users: mapped to a physical user, has a password for AWS Console. \nGroups: Contains users only. \nPolicies: JSON document that outlines permissions for users or groups. \nRoles: for EC2 instance or AWS service. \nAudit: IAM Credentials Report & IAM Access Advisor.'
    }]
  }, {
    main: 'EC2',
    child: [{
      title: 'Classic Ports',
      description: '22 = SSH (Secure Shell) - log in to Linux instance \n21 = FTP (File Transfer Protocol) - upload files into a file share \n22 = SFTP (Secure File Transfer Protocol) - upload files using SSH \n80 = HTTP - access unsecured websites \n443 = HTTPS - access secured websites \n3389 = RDP (Remote Desktop Protocol) - log in to a Windows instance'
    }, {
      title: 'EC2 Instance Purchasing Options',
      description: 'On-Demand Instances - short-term and un-interrupted workload, predictable pricing, pay by second \nReserved (1 & 3 years) - \n\n<ul>\n<li>Reserved Instances - long workloads</li>\n<li>Convertible Reserved Instances - long workloads with flexible instances<li>\n</ul> \n*Recommended for steady-state usage applications (database)\nSavings Plans (1 & 3 years) - commitment to an amount of usage, long workload \nSpot Instances - short workloads, cheap, can lose instance (less reliable) \n Dedicated Hosts - book an entire physical server, control instance placement \n\n<ul>\n<li>Address compliance requirements and use existing server-bound software licenses</li>\n</ul>\nDedicated Instances - no other customer will share your hardware \nCapacity Reservations - reserve capacity in a specific AZ for any duration'
    }, {
      title: 'How to Terminate Spot Instances?',
      description: 'Can only cancel Spot Instance Requests that are open, active or disabled. Cancelling a Spot Request does not terminate instances. Must first cancel a Spot Request, and then terminate the associated Spot Instaances\n If the request is persistent, the request is opened again after your Spot Instance is interrupted. If the request is persistent and you stop your Spot Instance, the request only opens after you start your Spot Instance.'
    }, {
      title: 'Spot Fleets',
      description: 'Spot Fleets = set of Spot Instances + (optional) On-Demand Instances \nStrategies to allocate Spot Instances: \n\n<ul>\n<li>lowestPrice: from pool with the lowest price (cost optimization, short workload)</li>\n<li>diversified: distributed across all pools (great for availability, long workloads)</li>\n<li>capacityOptimized: pool with the optimal capacity for the number of instances</li>\n<li>priceCapacityOptimized (recommended): pools with the highest capacity available, then select the pool with the lowest price (best choice for most workloads)</li>\n</ul>\n Spot Fleet allows us to automatically request Spot Instances with the lowest price'
    }, {
      title: 'EC2 Placement Groups',
      description: 'Cluster - clusters instances into a low-latency group in a single AZ\n[img]cluster\n\n<ul>\n</ul>\nSpread - spreads instances across underlying hardware (max 7 instances per group across AZ) -critical applications\n[img]spread\nPatrtition - spreads instances across many different partitions (rely on different sets of racks) within an AZ. Scales to 100s of EC2 instances per group (Hadoop, Cassandra, Kafka)\n[img]partition'
    }]
  }, {
    main: 'EC2 Instance Storage',
    child: [{
      title: 'EBS Volume',
      description: 'EBS (Elastic Block Store) is a network drive attached to instances.\n\n<ul>\n<li>Can be detached from one EC2 Instance and attached to another one quickly</li>\n</ul>\nAllows instances to persist data, even after termination.\nMulti-Attach - io 1/io 2 Family\n\n<ul>\n<li>Attach same EBS volume to multiple EC2 Instances in the same AZ</li>\n<li>Up to *16* instances only</li>\n</ul>\nBound to a specific AZ\n<ul>\n<li>Snapshot EBS to move volume across AZ</li>\n</ul>'
    }, {
      title: 'EC2 Instance Store',
      description: 'High-performance hardware disk\n\n<ul>\n<li>Better I/O performance</li>\n<li>EC2 Instance Store lose their storage if stopped</li>\n<li>Good for buffer/cache/scratch data/temporary content</li>\n<li>Risk of data loss if hardware fails</li>\n</ul>'
    }, {
      title: 'EBS Volume Types Summary',
      description: 'EBS Volumes\n\n<ul>\n<li>Item 1</li>\n<li>Do this summary pls</li>\n</ul>'
    }, {
      title: 'EBS vs EFS',
      description: 'EBS Volumes\n\n<ul>\n<li>One instance (except multi attach io1/io2)</li>\n<li>Locked at AZ level</li>\n<li>gp2: IO increases if dick size increases</li>\n<li>gp3 & io1: can insrease IO independently</li>\n</ul>\nTo migrate EBS across AZ\n\n<ul>\n<li>Take a snapshot</li>\n<li>Restore snapshot to another AZ</li>\n<li>EBS backup use IO, shouldn\'t run when application has high traffic</li>\n</ul>\nRoot EBS volumes of instances get terminated by default if EC2 is terminated (can disable)\n EFS \n\n<ul>\n<li>Mounting 100s of instances across AZ</li>\n<li>Share website files (Wordpress)</li>\n<li>Only for Linux instances</li>\n<li>EFS-IA (Infrequent Access) to save cost</li>\n</ul>'
    }]
  }, {
    main: 'ELB & ASG',
    child: [{
      title: 'ELB',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    },
    {
      title: 'ALB',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'NLB',

      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'GWLB',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'ASG',
      description: '[img]ec2Tenancy\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }]
  }, {
    main: 'RDS + Aurora + ElastiCache',
    child: [{
      title: 'RDS',
      description: 'Cannot SSH into instances\nUp to 15 read replicas. Replication is aysnc (eventual consistency)\nRDS multi AZ (disaster recovery): sync replication'
    }, {
      title: 'Aurora',
      description: 'Aurora scales automatically in increments of 10GB, up to 128TB \n[img]customEndpoint\nGlobal Aurora\n<ul>\n<li>Aurora Cross Region Read Replicas (disaster recovery)</li>\n<li>Aurora Global Database: Up to 16 Read Replicas, decrease latency</li>\n</ul> '
    }, {
      title: 'RDS & Aurora Backup',
      description: '[bold]RDS Backup\nAutomated Backups:\n\n<ul>\n<li>Daily full backup of the db</li>\n<li>Transaction logs are backed-up by RDS every 5 minutes</li>\n<li>Restore to any point in time (oldest backup to 5 minutes ago)</li>\n<li>1 to 35 days retention (can be disabled)</li>\n</ul>\nManual DB snapshots\n\n<ul>\n<li>Manually triggered by user</li>\n<li>Retention of backup as long as you want</li>\n</ul>\n[bold]Aurora Backup\nAutomated Backups:\n\n<ul>\n<li>1 to 35 days retention (cannot be disabled)</li>\n<li>point-in-time recovery in that timeframe</li>\n</ul>\nManual DB snapshots\n\n<ul>\n<li>Manually triggered by user</li>\n<li>Retention of backup as long as you want</li>\n</ul>\n[bold]RDS & Auora Restore options\nRestoring a RDS/Aurora backup or snapshot creates a new database\nRestoring MySQL RDS database from S3\n\n<ul>\n<li>Create backup of on-premise db</li>\n<li>Store it on S3</li>\n<li>Restore the backup file onto new RDS instance running MySQL</li>\n</ul>\n\nRestoring MySQL Aurora cluster from S3\n\n<ul>\n<li>Create backup of on-premise db using Percona XtraBackup</li>\n<li>Store it on S3</li>\n<li>Restore the backup file onto new Aurora cluster  running MySQL</li>\n</ul>\n[bold]Aurora Database cloning\n\n<ul>\n<li>Create a new Aurora DB Cluster from an existing one</li>\n<li>Faster than snapshot & restore</li>\n<li>Copy-on-write protocol</li>\n<li>Useful to create "staging" db from "production"</li>\n</ul>'
    }, {
      title: 'ElactiCache',
      description: '[img]elasticache\n[bold]Patterns for ElastiCache\n\n<ul>\n<li>Lazy Loading: All read data is cached, data can be stale in cache</li>\n<li>Write Through: Adds/update data in cahce when written to DB (no stale data)</li>\n<li>Session Store: Store temporary session data in cahce (using TTL)</li>\n</ul>\n[bold]Redis Sorted sets guarantee uniqueness and element ordering'
    }]
  }, {
    main: 'Route 53',
    child: [{
      title: 'IDK want do anot',
      description: '[img]route53Types\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'Cname vs Alias',
      description: '[img]cnameVsalias\n[bold]**Cannot set ALIAS record for EC2 DNS name'
    }]
  }, {
    main: 'S3',
    child: [{
      title: 'Versioning',
      description: '\n\n<ul>\n<li>Enabled at bucket level</li>\n<li>Same key overwrite will change the "version": 1,2,3....</li>\n<li>Protect against unintended deletes (ability to restore a version)</li>\n<li>Easy roll back to previous version</li>\n<li>**Any file that is not versioned prior to enable versioning will have version "null"</li>\n<li>**Suspending versioning does not delete the previous versions</li>\n</ul>'
    }, {
      title: 'Replication (CRR & SRR)',
      description: 'Must enable versioning in source\nBuckets can be in different AWS accounts\nCopying is async\nMust give proper IAM permissions to S3\nUse case:\n\n<ul>\n<li>Cross-Region-Replication  (CRR) - compliance, lower latency access, replication across accounts</li>\n<li>Same-Region-Replication (SRR) - log aggregation, live replication between production and test accounts</li>\n</ul>\n[bold]***Notes***\nOnly new objects are replicated after enabling replication. Use S3 Batch Replication to replicate existing objects\nFor DELETE operations\n\n<ul>\n<li>Can replicate delete markers from source to target (optional setting)</li>\n<li>Deletions with a version ID are not replicated (to avoid malicious deletes)</li>\n</ul>\nThere is no chaining of replication\n\n<ul>\n<li>If Bucket 1 replicate into Bucket 2, which is replicated into Bucket 3, objects created in Bucket 1 are not replicated to Bucket 3</li>\n</ul>'
    }, {
      title: 'S3 Storage Classes Overview',
      description: '[bold]General Purpose\n\n<ul>\n<li>99.99% availability</li>\n<li>Used for frequendtly accessed data</li>\n<li>Low latency and high throughput</li>\n<li>Sustain 2 concurrent facility failures</li>\n<li>Use case: Big Data analytics, mobile & gaming applications, content distribution...</li>\n</ul>\n[bold]Infreqent Access\nFor data that is less frequently accessed, but requires rapid access when needed\nLower cost than S3 Standard\n[bold]Amazon S3 Standard-Infrequent Access (S3 Standard-IA)\n\n<ul>\n<li>99.9% Availability</li>\n<li>Use case: Disaster Recovery, backups</li>\n</ul>\n[bold]Amazon S3 One Zone-Infrequent Access (S3 One-Zone IA)\n\n<ul>\n<li>High durability (99.9999999%) in a single AZ; data lost when AZ is destroyed, 99.95% Availability</li>\n<li>Use case: Storing secondary backup copies of on-premise data, or data you can recreate </li>\n</ul>'
    }, {
      title: 'S3 Lifecycle Rules',
      description: 'Transition Actions - configure objects to transition to another storage class\n\n<ul>\n<li>Move objects to Standard IA class 60 days after creation</li>\n<li>Move to Glacier for archiving after 6 months</li>\n</ul>\nExpiration Actions - configure objects to expire (delete) after some time\n\n<ul>\n<li>Access log files can be set to delete after 365 days</li>\n<li>Can be used to delete old versions of files (if versioning is enabled)</li>\n<li>Can be used to delete incomplete Multi-Part uploads</li>\n</ul>\nRules can be created for a certain prefix (eg: s3://mybucket/mp3/*)\nRules can be created for certain objects Tags (eg:Department:Finance)'
    }]
  }, {
    main: 'S3 Security',
    child: [{
      title: 'MFA Delete',
      description: 'MFA required to:\n\n<ul>\n<li>Permanently delete an object version</li>\n<li>Suspend Versioning on bucket</li>\n</ul>\n[bold]MFA not required to:\n\n<ul>\n<li>Enable versioning</li>\n<li>List deleted versions</li>\n</ul>\nTo use MFA Delete, Versioning must be enabled on the bucket\nOnly bucket owner (root account) can enable/disable MFA Delete'
    },
    {
      title: 'S3 Pre-signed URLs',
      description: 'Generate pre-signed URLs using the S3 Console, AWS CLI, or SDK\nURL Expiration:\n\n<ul>\n<li>S3 Console - 1 min up to 720 mins (12 hours)</li>\n<li>AWS CLI - configure expiration with - expires-in parameter in seconds (default 3600 seconds, max 604800 secs ~ 168 hours</li>\n</ul>'
    }, {
      title: 'Glacier Vault Lock & S3 Object Lock',
      description: '[bold]S3 Glacier Vault Lock\n\n<ul>\n<li>Adopt a WORM (Write Once, Read Many) model</li>\n<li>Create a Vault Lock Policy</li>\n<li>Lock the policy for future edits (objects can no longer be  changed or deleted)</li>\n<li>Helpful for compliance and data retention</li>\n</ul>\n[bold]S3 Object Lock (versioning must be enabled)\n\n<ul>\n<li>Adopt a WORM (Write Once, Read Many) model</li>\n<li>Block an object version deletion for a specified amount of time</li>\n<li>Retention mode - Compliance: Object versions cannot be overwritten or deleted by any user, including root user. Object retention modes cannot be changed, retention period cannot be shortened</li>\n<li>Retention mode - Governance: Most users cannot overwrite or delete an object verison or alter its lock settings. Some users have special permissions to change the retention or delete the object</li>\n<li>Retention Period: protect the object for a fixed period, it can be extended</li>\n<li>Legal Hold: Protect the object indefinitely, independent from retention period. Can be freely placed and removed using s3:PutObjectLegalHold IAM permission</li>\n</ul>'
    }, {
      title: '3',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: '4',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }]
  }, {
    main: 'CloudFront & AWS Global Accelerator',
    child: [{
      title: 'CloudFront vs S3 Cross Region Replication',
      description: '[bold]CloudFront\n\n<ul>\n<li>Global Edge network</li>\n<li>Files are cached for a TTL (maybe a day)</li>n<li>Great for static content that must be available everywhere</li>\n</ul>\n[bold]S3 Cross Region Replication\n\n<ul>\n<li>Must setup for each region you want replication to happen</li>\n<li>Files are updated in near real-time</li>n<li>Read only</li>n<li>Great for dynamic content that needs to be available at low-latency in few regions</li>\n</ul>'
    },
    {
      title: 'AWS Global Accelerator',
      description: '[img]globalAccelerator\n[img]globalAcceleratorVsCloudFront'
    }]
  }, {
    main: 'AWS Storage Extras (Snow, Fsx...)',
    child: [{
      title: 'AWS Snow Family',
      description: 'Offline devices to perform data migrations\nIf it takes more than a week to transfer over the network, use Snowball devices\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>\n[img]snowballGlacier'
    }, {
      title: 'AWS Transfer Family',
      description: '[img]transFam\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'AWS Data Sync',
      description: '[img]dataSync'
    }]
  }, {
    main: 'SQS, SNS, Kinesis, Active MQ',
    child: [{
      title: 'Kinesis Data Streams vs Firehose',
      description: '[img]kinesis'
    }, {
      title: 'SQS vs SNS vs Kinesis',
      description: '[img]sqsSnsKinesis\n[bold]**Note**\nSQS FIFO queue support up to 300 messages per second(300 send, receive, or delete operations per second). Can batch up to a maximum of 10 messages, i.e. 3000 messages.'
    }, {
      title: 'Amazon MQ',
      description: '[img]mq'
    }]
  }, {
    main: 'Containers on AWS',
    child: [{
      title: 'ECS',
      description: '[img]ec2LaunchType\n[img]fargate\n[img]ecsRoles'
    }, {
      title: 'AppRunner',
      description: '[img]appRunner'
    }]
  }, {
    main: 'Lambda, DynamoDB, API Gateway',
    child: [{
      title: 'Lambda Limits',
      description: '[img]lambdaLimit'
    }, {
      title: 'Dynamo DB',
      description: '[bold]DynamoDB Accelerator (DAX)\n\n<ul>\n<li>In-memory cache for DynamoDB</li>\n<li>Solve read congestion by caching</li>\n<li>5 minutes TTL for cache (default)</li>\n</ul>\n[img]dynamoDbStream\n[img]dynamoDBGlobal\n[bold]DynamoDB - Time To Live (TTL)\n\n<ul>\n<li>Automatically delete items after an expiry timestamp</li>\n<li>Use case: Reduce stored data by keeping only current items, adhere to regulatory obligations, web session handling....</li>\n</ul>\n[img]dynamoDbDR\n[img]dynamoDB'
    }]
  }, {
    main: 'Database',
    child: [{
      title: 'DB',
      description: '[img]db'
    }]
  }, {
    main: 'Data & Analytics',
    child: [{
      title: 'Overview Gua',
      description: 'Athena - Serverless query service to analyze data stored in Amazon S3\nRedShift - Faster than Athena due to indexes\nOpenSearch - Search any field, even partial matches, with ingestion from Kinesis Data Firehose, AWS IoT, CloudWatch Logs\nEMR (Elastic Map Reduce) - create Hadoop clusters (Big Data) to analyze and process data\nQuickSight - Interactive dashboard for business analytics, building visualizations, ad-hoc analysis with integration from RDS, Aurora, Athena, RedShift, S3...\nGlue - managed extract, transform and load (ETL) service. Useful to prepare and transform data for analytics\n[img]glue\n[img]lakeFormation'
    }, {
      title: 'DB2',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'DB3',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'DB4',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'DB5',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }, {
      title: 'DB6',
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    },]
  }, {
    main: 'AWS Security',
    child: [{
      title: 'Amazon GuardDuty',
      description: '[img]guardDuty'
    }, {
      title: 'Amazon Inspector',
      description: '[img]inspector'
    }, {
      title: 'Amazon Macie',
      description: '[img]macie'
    }]
  }, {
    main: 'Amazon Cognito',
    child: [{
      title: 'Amazon Cognito',
      description: '[bold]User Pools\nCreate a user pool when you want to authenticate and authorize users to your app or API.\n[bold]Identity Pools\nSet up an Amazon Cognito identity pool when you want to authorize authenticated or anonymous users to access your AWS resources.'
    }]
  }
  ];
  const [datas, setDatas] = useState(initialDatas);
  const renderChild = (component) => {
    console.log(initialDatas[0].child.map(item => item.title))
    setDatas(initialDatas.filter(data => data.main === component));
  }


  const [selectedMain, setSelectedMain] = useState(initialDatas[0].main);
  const [selectedChild, setSelectedChild] = useState(null);

  const onItemClick = (main) => {
    setSelectedMain(main);
    const selectedData = initialDatas.find(data => data.main === main);
    setSelectedChild(selectedData.child[0]); // Select the first child when a parent is clicked
  };

  function handleSelectChild(value) {
    setSelectedChild(value); // Update selected value when a child is clicked
  };

  const selectedData = initialDatas.find(data => data.main === selectedMain);
  const menuRef = useRef(null);
  const [dragStartX, setDragStartX] = useState(null);

  const handleMouseDown = (event) => {
    setDragStartX(event.clientX);
  };

  const handleMouseUp = () => {
    setDragStartX(null);
  };

  const handleMouseMove = (event) => {
    if (dragStartX !== null) {
      const deltaX = event.clientX - dragStartX;
      if (menuRef.current) {
        menuRef.current.scrollLeft -= deltaX;
      }
      setDragStartX(event.clientX);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <MainValues datas={initialDatas} onItemClick={onItemClick} />
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => (
              <CoreConcept
                key={conceptItem.title}
                {...conceptItem}
                onClick={() => handleSelect(conceptItem.title)}
              />
            ))}
          </ul>
        </section>
        <section id="examples">
          <div className='menu-container'>
            <h2>Example why</h2>
            <menu
              ref={menuRef}
              className="menu"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {selectedData.child.map((item, index) => (
                <TabButton
                  key={index}
                  isSelected={selectedChild && selectedChild.title === item.title}
                  onSelect={() => handleSelectChild(item)}
                >
                  {item.title}
                </TabButton>
              ))}
            </menu>
          </div>
          {!selectedChild && <p>Please select a topic.</p>}
          {selectedChild && (
            <div id='tab-content'>
              <h3>{selectedChild.title}</h3>
              <div>{parseDescription(selectedChild.description)}</div>
            </div>
          )}
        </section>
      </main>
    </div >
  );
}

export default App;