/* Test 1 mock paper 2. Rendered by assets/js/mock-paper.js on mock-test1/mock2.html.
   Image paths are relative to the page (mock-test1/), hence the leading ../ */
window.MOCK_PAPER = {
 "title": "Mock 2 - Dependencies & Reporting",
 "subtitle": "Resolving a chain of transitive dependencies in a single-key property table, ER design of the result, and Microsoft Access SQL over a courier-delivery database.",
 "summary": "Transitive dependencies, ER diagrams and courier SQL.",
 "duration": 180,
 "sections": [
  {
   "key": "A",
   "title": "Section A - Multiple Choice",
   "marks": 10,
   "color": "blue",
   "parts": [
    {
     "type": "mcq",
     "intro": "Answer all 10 questions. Each question carries 1 mark. Questions deliberately vary in the skill they test.",
     "start": 1,
     "items": [
      [
       "Which normal form requires that every determinant in a table be a candidate key (i.e. eliminates dependencies on non-candidate-key attributes)?",
       [
        "2NF",
        "3NF",
        "BCNF",
        "1NF"
       ],
       2,
       "BCNF strengthens 3NF by requiring every determinant to be a candidate key, closing cases 3NF still allows."
      ],
      [
       "In a crow's-foot ERD, a relationship line ending in a circle plus a crow's-foot (0..*) compared to one ending in a single bar plus a crow's-foot (1..*) tells you that participation on that side is __________.",
       [
        "Optional rather than mandatory",
        "Mandatory rather than optional",
        "One-to-one rather than many",
        "A weak relationship"
       ],
       0,
       "A circle marks optional (zero-or-many) participation, whereas a single bar marks mandatory (one-or-many) participation."
      ],
      [
       "A decomposition of a relation is described as 'lossless-join' when __________.",
       [
        "Every attribute appears in at least one resulting table",
        "Joining the resulting tables back together reproduces exactly the original relation, with no spurious rows",
        "The decomposition removes all foreign keys",
        "Every resulting table is in 1NF"
       ],
       1,
       "A lossless-join decomposition guarantees that recombining the decomposed tables via natural join returns exactly the original data, introducing no extra or missing rows."
      ],
      [
       "Which foreign key constraint action automatically deletes related child rows when the referenced parent row is deleted?",
       [
        "ON UPDATE CASCADE",
        "ON DELETE CASCADE",
        "ON DELETE SET NULL",
        "ON DELETE RESTRICT"
       ],
       1,
       "ON DELETE CASCADE propagates a parent deletion to matching child rows automatically."
      ],
      [
       "What is the main purpose of creating an index on a frequently-searched column?",
       [
        "To enforce that the column's values are unique",
        "To speed up lookups on that column, at some cost to storage and write performance",
        "To prevent NULL values in that column",
        "To automatically normalise the table"
       ],
       1,
       "An index speeds up searching/sorting on the indexed column, trading extra storage and slightly slower writes for faster reads."
      ],
      [
       "A saved SELECT statement that can be queried like a table but does not itself store a separate copy of the data is called a __________.",
       [
        "Trigger",
        "View",
        "Stored procedure",
        "Materialised index"
       ],
       1,
       "A view is a virtual table defined by a stored query; it is evaluated against the underlying tables each time it is used."
      ],
      [
       "Which of the following is NOT one of the ACID properties of a database transaction?",
       [
        "Atomicity",
        "Consistency",
        "Isolation",
        "Availability"
       ],
       3,
       "The ACID properties are Atomicity, Consistency, Isolation and Durability - availability is not one of them."
      ],
      [
       "COUNT(ColumnName) differs from COUNT(*) in that COUNT(ColumnName) __________.",
       [
        "Counts every row regardless of NULLs",
        "Only counts rows where ColumnName is not NULL",
        "Can only be used with GROUP BY",
        "Automatically removes duplicate rows"
       ],
       1,
       "COUNT(ColumnName) counts only the non-NULL values in that column, while COUNT(*) counts all rows."
      ],
      [
       "A CUSTOMER table stores every phone number a customer has crammed into a single Phones column (e.g. '011-555-1234, 082-555-9876'). This is a violation of __________, since the column is not atomic.",
       [
        "Second Normal Form",
        "Third Normal Form",
        "First Normal Form",
        "Referential integrity"
       ],
       2,
       "1NF requires atomic, single-valued columns; storing multiple phone numbers in one field breaks this and should be split into a separate PHONE table."
      ],
      [
       "A table's candidate key that was not chosen as the primary key is referred to as a(n) __________.",
       [
        "Foreign key",
        "Alternate key",
        "Surrogate key",
        "Composite key"
       ],
       1,
       "Any candidate key not selected as the primary key becomes an alternate key for that table."
      ]
     ]
    }
   ]
  },
  {
   "key": "B",
   "title": "Section B - Normalization",
   "marks": 15,
   "color": "yellow",
   "parts": [
    {
     "type": "qs",
     "scenario": "A letting agency stores data about the properties on its books in the single relation <b>PROPERTY(<u>PropertyID</u>, Address, Bedrooms, AgentID, AgentName, AgentPhone, OfficeID, OfficeName, OfficeCity)</b>. PropertyID is the sole primary key. Every property is handled by one agent, and every agent works from one office. The functional dependencies are shown in the diagram below.",
     "diagram": "<div class=\"diagram-wrap\"><img src=\"../assets/img/t1-mock/mock2-normalisation.png\" alt=\"PROPERTY dependency diagram\"></div>",
     "qs": [
      {
       "q": "1.1 State the highest normal form PROPERTY currently satisfies and justify your answer. Then list all functional dependencies, classifying each as a key, partial or transitive dependency. [5 marks]",
       "a": "PROPERTY is in <b>2NF</b> (but not 3NF). All values are atomic, so it is in 1NF; because the primary key is a single attribute (PropertyID) there can be no partial dependencies, so it is automatically in 2NF. It fails 3NF because non-key attributes determine other non-key attributes.<br>Dependencies:<br>PropertyID &rarr; Address, Bedrooms, AgentID <i>(key dependencies)</i><br>AgentID &rarr; AgentName, AgentPhone, OfficeID <i>(transitive on PropertyID via AgentID)</i><br>OfficeID &rarr; OfficeName, OfficeCity <i>(transitive via OfficeID)</i><br>There are <i>no partial dependencies</i> because the key is a single attribute."
      },
      {
       "q": "1.2 Normalise PROPERTY to Third Normal Form (3NF). Show each relation with its primary and foreign keys and explain the transitive dependencies you removed. [7 marks]",
       "a": "Place each determinant in its own relation and link them with foreign keys, removing the chain PropertyID &rarr; AgentID &rarr; OfficeID:<br>PROPERTY(<u>PropertyID</u>, Address, Bedrooms, <i>AgentID</i>) &mdash; AgentID is a foreign key.<br>AGENT(<u>AgentID</u>, AgentName, AgentPhone, <i>OfficeID</i>) &mdash; removes AgentID &rarr; AgentName, AgentPhone, OfficeID; OfficeID is a foreign key.<br>OFFICE(<u>OfficeID</u>, OfficeName, OfficeCity) &mdash; removes OfficeID &rarr; OfficeName, OfficeCity.<br>Each non-key attribute now depends only on its own relation's key."
      },
      {
       "q": "1.3 Explain why PROPERTY could never contain a partial dependency, and describe one anomaly the original un-normalised design would suffer. [3 marks]",
       "a": "A partial dependency is a dependency of a non-key attribute on <i>part</i> of a composite key. PROPERTY's primary key is the single attribute PropertyID, which has no proper subset, so a partial dependency is impossible. Anomaly example (any one): <b>update</b> &mdash; changing an office's city means editing every property row served by that office; <b>insertion</b> &mdash; a new office with no properties yet cannot be recorded; <b>deletion</b> &mdash; deleting the last property handled by an agent loses that agent's and office's details."
      }
     ]
    }
   ]
  },
  {
   "key": "C",
   "title": "Section C - ER Modelling",
   "marks": 10,
   "color": "blue",
   "parts": [
    {
     "type": "qs",
     "scenario": "Use your 3NF answer above and the following business rules to design the database. Each property is managed by exactly one (1) agent, and an agent must manage at least one (1) property. Each agent works from exactly one (1) office, and an office must employ at least one (1) agent.",
     "qs": [
      {
       "q": "2.1 Draw a fully labelled ERD for the normalised structure, including all attributes and primary/foreign keys. [10 marks]",
       "a": "A one-to-many chain OFFICE &rarr; AGENT &rarr; PROPERTY:<br>OFFICE(<u>OfficeID</u> PK, OfficeName, OfficeCity) &mdash; 1 &harr; 1..* &mdash; AGENT.<br>AGENT(<u>AgentID</u> PK, AgentName, AgentPhone, <i>OfficeID</i> FK) &mdash; 1 &harr; 1..* &mdash; PROPERTY.<br>PROPERTY(<u>PropertyID</u> PK, Address, Bedrooms, <i>AgentID</i> FK).<br>There is no associative entity because every relationship here is one-to-many, not many-to-many."
      }
     ]
    }
   ]
  },
  {
   "key": "D",
   "title": "Section D - Microsoft Access SQL",
   "marks": 20,
   "color": "yellow",
   "parts": [
    {
     "type": "qs",
     "intro": "Consider the following ERD for a courier company's delivery database (shown below). Each delivery is made for exactly one customer, by exactly one driver, and dispatched from exactly one depot; a customer, a driver and a depot may each be linked to many deliveries. Because every delivery references three surrounding entities, DELIVERY sits at the centre of a hub-and-spoke design. The tables are: CUSTOMER(<u>CustomerNo</u>, CustomerName, City), DRIVER(<u>DriverNo</u>, DriverName, LicenceClass), DEPOT(<u>DepotNo</u>, DepotName, DepotCity) and DELIVERY(<u>DeliveryNo</u>, CustomerNo, DriverNo, DepotNo, DeliveryDate, Fee).",
     "diagram": "<div class=\"diagram-wrap\"><img src=\"../assets/img/t1-mock/mock2-erd-sql.png\" alt=\"Courier Delivery ERD\"></div>",
     "scenario2": "<b>Access requirement.</b> Use Microsoft Access SQL. Use <code class=\"inline\">TOP</code>, <code class=\"inline\">Nz()</code>, <code class=\"inline\">IIf()</code>, Access wildcards and Access date literals where appropriate.",
     "qs": [
      {
       "q": "3.1 Write an SQL query to show, for each customer, the customer number, customer name and the total delivery fees charged to them (heading 'Total Fees'). Show only customers whose total exceeds 1000, sorted from highest total to lowest. [8 marks]",
       "a": "SELECT c.CustomerNo, c.CustomerName, Sum(d.Fee) AS [Total Fees]\nFROM Customer AS c\n     INNER JOIN Delivery AS d ON c.CustomerNo = d.CustomerNo\nGROUP BY c.CustomerNo, c.CustomerName\nHAVING Sum(d.Fee) > 1000\nORDER BY Sum(d.Fee) DESC;"
      },
      {
       "q": "3.2 Write an SQL query to list every delivery dispatched from a depot located in Durban. Show the delivery number, the customer name, the driver name and the delivery date. [8 marks]",
       "a": "SELECT d.DeliveryNo, c.CustomerName, dr.DriverName, d.DeliveryDate\nFROM ((Delivery AS d\n       INNER JOIN Customer AS c ON d.CustomerNo = c.CustomerNo)\n       INNER JOIN Driver AS dr ON d.DriverNo = dr.DriverNo)\n       INNER JOIN Depot AS dp ON d.DepotNo = dp.DepotNo\nWHERE dp.DepotCity = 'Durban';\n\nAll four tables are joined so that each delivery can show its customer and driver, while the depot is used to filter on city."
      },
      {
       "q": "3.3 Which JOIN type would return all rows from DELIVERY even when a delivery has no matching DEPOT row? [1 mark]",
       "a": "A LEFT JOIN (with DELIVERY as the left table) &mdash; it keeps every delivery and fills the depot columns with NULL where there is no match."
      },
      {
       "q": "3.4 Which SQL aggregate function returns the largest single delivery fee in the DELIVERY table? [1 mark]",
       "a": "MAX &mdash; e.g. Max(Fee) returns the highest fee value in the column."
      },
      {
       "q": "3.5 Explain the purpose of the three foreign keys (CustomerNo, DriverNo, DepotNo) in the DELIVERY table, and why DELIVERY is called the 'hub' of this design. [2 marks]",
       "a": "Each foreign key links a delivery to exactly one row in CUSTOMER, DRIVER and DEPOT respectively, enforcing referential integrity and recording who the delivery was for, who drove it and where it came from. DELIVERY is the hub because it sits at the centre and references all three surrounding ('spoke') entities, combining their data in one place."
      }
     ]
    }
   ]
  }
 ]
};
