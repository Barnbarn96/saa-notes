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
      description: 'Can only cancel Spot Instance Requests that are open, active or disabled. Cancelling a Spot Request does not terminate instances. Must first cancel a Spot Request, and then terminate the associated Spot Instaances'
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
      description: 'n<li></li>'
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
      description: '\n\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>'
    }]
  }, {
    main: 'S3',
    child: [{
      title: 'Versioning',
      description: '\n\n<ul>\n<li></li>\n<li>Item 2</li>\n</ul>'
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