/* Test 1 mock paper 1. Rendered by assets/js/mock-paper.js on mock-test1/mock1.html.
   Image paths are relative to the page (mock-test1/), hence the leading ../ */
window.MOCK_PAPER = {
 "title": "Mock 1 - Applied Schema Design",
 "subtitle": "Normalisation from an unnormalised sales-invoice extract, ER modelling of the resulting schema, and Microsoft Access SQL reporting over a conference database.",
 "summary": "Invoice normalisation, ER diagrams and conference SQL.",
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
       "Which of the following best describes a weak entity in ER modelling?",
       [
        "An entity with no attributes",
        "An entity that cannot be uniquely identified without the primary key of another entity",
        "An entity involved in a many-to-many relationship",
        "An entity with only foreign keys"
       ],
       1,
       "A weak entity has no candidate key of its own and borrows part of its identifier from its owner entity."
      ],
      [
       "Designing a database involves multiple steps. Which of the following shows the correct sequence?",
       [
        "Physical, Conceptual, Logical",
        "Conceptual, Logical, Physical",
        "Logical, Physical, Conceptual",
        "Any of the above sequence is correct"
       ],
       1,
       "Design moves from the conceptual (business view) to logical (relational schema) to physical (implementation)."
      ],
      [
       "In relational database design, breaking down complex tables into smaller ones to eliminate redundancy is known as __________.",
       [
        "Denormalisation",
        "Normalisation",
        "Indexing",
        "Aggregation"
       ],
       1,
       "Normalisation decomposes relations to remove redundancy and anomalies."
      ],
      [
       "Metadata that describes the structure of tables, columns, and relationships in a database is stored in the __________.",
       [
        "Data dictionary",
        "Application log",
        "User schema",
        "Index file"
       ],
       0,
       "The data dictionary holds metadata about the database's own structure."
      ],
      [
       "Consider the following dependencies and the EMPLOYEE table in a relational database design. Determine the current normal form of the given relation.<br>EmployeeID → DepartmentID, EmployeeID → EmployeeName, DepartmentID → DepartmentName",
       [
        "Unnormalised Form",
        "First Normal Form",
        "Second Normal Form",
        "Third Normal Form"
       ],
       2,
       "The key is a single attribute (no partial dependency is possible), but DepartmentName is transitively dependent on EmployeeID via DepartmentID, so it satisfies 2NF but not 3NF."
      ],
      [
       "In relational database management systems, the constraint that a foreign key value must either match an existing primary key value in the referenced table or be NULL is referred to as __________.",
       [
        "Entity integrity",
        "Domain integrity",
        "Referential integrity",
        "Functional dependency"
       ],
       2,
       "Referential integrity governs how foreign keys must relate to the primary keys they reference."
      ],
      [
       "A table has fields OrderID, ProductID, ProductName and OrderQty, where the domains of these fields include only atomic values, and only the following functional dependencies and those that can be inferred from them: OrderID → OrderQty, ProductID → ProductName. In terms of normalisation, this table is in __________.",
       [
        "Unnormalised form",
        "First normal form, but not in second normal form",
        "Second normal form, but not in third normal form",
        "Third normal form"
       ],
       1,
       "The key is {OrderID, ProductID}, but OrderQty and ProductName each depend on only part of that key — a partial dependency, so the table is in 1NF but not 2NF."
      ],
      [
       "Consider the entities “COURSE” and “STUDENT” with a many-to-many relationship “Enrolment”. If you wish to store data about the grade achieved by student(s) in different courses, then this data should appear as an attribute of __________.",
       [
        "STUDENT",
        "COURSE",
        "Enrolment",
        "None of the above"
       ],
       2,
       "Grade describes a specific student-course pairing, so it belongs on the associative Enrolment relation."
      ],
      [
       "At a South African hospital, each patient is assigned a national ID number by Home Affairs. The hospital’s database also generates a unique PatientID as an auto-increment value for internal use. Which statement best describes the keys in this situation?",
       [
        "Both the national ID number and PatientID are natural keys.",
        "Both the national ID number and PatientID are surrogate keys.",
        "The national ID number is a surrogate key, and PatientID is a natural key.",
        "The national ID number is a natural key, and PatientID is a surrogate key."
       ],
       3,
       "The national ID exists independently in the real world (natural key); PatientID is a database-generated identifier (surrogate key)."
      ],
      [
       "A company database stores employee project assignments in a single table as follows: EmployeeID, EmployeeName, ProjectCode, ProjectName, ProjectManager. Consider: 1. Deleting the last employee assigned to a project also deletes data about the project itself. 2. Changing the project manager requires updating multiple rows for every employee on that project. 3. You cannot add a new project unless at least one employee is assigned to it. Which types of anomalies do these situations represent?",
       [
        "1 → Deletion anomaly, 2 → Update anomaly, 3 → Insertion anomaly",
        "1 → Insertion anomaly, 2 → Deletion anomaly, 3 → Update anomaly",
        "1 → Update anomaly, 2 → Insertion anomaly, 3 → Deletion anomaly",
        "1 → Update anomaly, 2 → Deletion anomaly, 3 → Insertion anomaly"
       ],
       0,
       "Losing project data on a delete is a deletion anomaly; needing many updates for one fact is an update anomaly; being blocked from inserting a project is an insertion anomaly."
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
     "scenario": "A wholesaler records every sale in a single unnormalised structure. The extract below shows sample data for the relation <b>SALES_INVOICE</b>. Each invoice lists one or more purchased products as a <i>repeating group</i> (the shaded columns ProductID, ProductDesc, UnitPrice and QtySold). A product's description and unit price depend only on the product; a customer's name and city depend only on the customer. Use the sample data and the dependencies you can infer from it to answer the questions that follow.",
     "diagram": "<div class=\"diagram-wrap\"><img src=\"../assets/img/t1-mock/mock1-normalisation.png\" alt=\"SALES_INVOICE unnormalised sample data\"></div>",
     "qs": [
      {
       "q": "1.1 The data above is in unnormalised form (UNF). Convert it to First Normal Form (1NF): remove the repeating group, state the resulting relation with its primary key, and list all functional dependencies. [5 marks]",
       "a": "Remove the repeating group so every cell holds a single atomic value; one row per invoice line. The composite key becomes {InvoiceNo, ProductID}:<br>SALES_INVOICE(<u>InvoiceNo, ProductID</u>, InvoiceDate, CustomerID, CustomerName, CustomerCity, ProductDesc, UnitPrice, QtySold).<br>Functional dependencies:<br>InvoiceNo &rarr; InvoiceDate, CustomerID<br>CustomerID &rarr; CustomerName, CustomerCity <i>(transitive, via InvoiceNo &rarr; CustomerID)</i><br>ProductID &rarr; ProductDesc, UnitPrice<br>{InvoiceNo, ProductID} &rarr; QtySold <i>(full-key dependency)</i>"
      },
      {
       "q": "1.2 Take your 1NF relation to Second Normal Form (2NF). Show each relation with its primary key and state which partial dependencies you removed. [7 marks]",
       "a": "2NF removes dependencies on <i>part</i> of the composite key {InvoiceNo, ProductID}:<br>INVOICE(<u>InvoiceNo</u>, InvoiceDate, CustomerID, CustomerName, CustomerCity) &mdash; removes the partial dependency on InvoiceNo.<br>PRODUCT(<u>ProductID</u>, ProductDesc, UnitPrice) &mdash; removes the partial dependency on ProductID.<br>INVOICE_LINE(<u>InvoiceNo, ProductID</u>, QtySold) &mdash; QtySold depends on the whole key, so it stays."
      },
      {
       "q": "1.3 Extend your answer to Third Normal Form (3NF), giving fully labelled relations. [3 marks]",
       "a": "3NF removes the transitive dependency CustomerID &rarr; CustomerName, CustomerCity from INVOICE:<br>CUSTOMER(<u>CustomerID</u>, CustomerName, CustomerCity).<br>INVOICE(<u>InvoiceNo</u>, InvoiceDate, <i>CustomerID</i>) &mdash; now in 3NF (CustomerID is a foreign key).<br>PRODUCT(<u>ProductID</u>, ProductDesc, UnitPrice) and INVOICE_LINE(<u>InvoiceNo, ProductID</u>, QtySold) were already in 3NF."
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
     "scenario": "Use your 3NF answer above and the following business rules to design the database. A customer must have placed at least one (1) invoice to be recorded; each invoice is placed by exactly one (1) customer. An invoice must contain at least one (1) invoice line; each invoice line belongs to exactly one (1) invoice. A product may appear on many invoice lines but need not appear on any; each invoice line is for exactly one (1) product.",
     "qs": [
      {
       "q": "2.1 Draw a fully labelled ERD for the normalised structure, including all attributes and primary/foreign keys. [10 marks]",
       "a": "CUSTOMER(<u>CustomerID</u> PK, CustomerName, CustomerCity) &mdash; 1 &harr; 1..* &mdash; INVOICE.<br>INVOICE(<u>InvoiceNo</u> PK, InvoiceDate, <i>CustomerID</i> FK) &mdash; 1 &harr; 1..* &mdash; INVOICE_LINE.<br>PRODUCT(<u>ProductID</u> PK, ProductDesc, UnitPrice) &mdash; 1 &harr; 0..* &mdash; INVOICE_LINE.<br>INVOICE_LINE(<u>InvoiceNo, ProductID</u>, QtySold) is the <b>associative (junction) entity</b> resolving the many-to-many between INVOICE and PRODUCT; its composite primary key is made of the two foreign keys InvoiceNo and ProductID."
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
     "intro": "Consider the following ERD for a conference-management database (shown below). A delegate may attend many sessions and a session may be attended by many delegates; each <b>ATTENDANCE</b> record links exactly one delegate to exactly one session and stores the seat row and that delegate's rating (1&ndash;5) of the session. Every session belongs to exactly one track, and a track groups many sessions. The tables are: DELEGATE(<u>DelegateNo</u>, DelegateName, Organisation, City), SESSION(<u>SessionNo</u>, SessionTitle, TrackCode, StartTime), TRACK(<u>TrackCode</u>, TrackName) and ATTENDANCE(<u>DelegateNo, SessionNo</u>, SeatRow, Rating).",
     "diagram": "<div class=\"diagram-wrap\"><img src=\"../assets/img/t1-mock/mock1-erd-sql.png\" alt=\"Conference ERD\"></div>",
     "scenario2": "<b>Access requirement.</b> Use Microsoft Access SQL. Use <code class=\"inline\">TOP</code>, <code class=\"inline\">Nz()</code>, <code class=\"inline\">IIf()</code>, Access wildcards and Access date literals where appropriate.",
     "qs": [
      {
       "q": "3.1 Write an SQL query to show, for each track, the track code, track name and the average delegate rating of that track's sessions (heading 'Avg Rating'). Show only tracks whose average rating is greater than 4, sorted from highest average to lowest. [8 marks]",
       "a": "SELECT t.TrackCode, t.TrackName, Avg(a.Rating) AS [Avg Rating]\nFROM (Track AS t\n      INNER JOIN Session AS s ON t.TrackCode = s.TrackCode)\n      INNER JOIN Attendance AS a ON s.SessionNo = a.SessionNo\nGROUP BY t.TrackCode, t.TrackName\nHAVING Avg(a.Rating) > 4\nORDER BY Avg(a.Rating) DESC;"
      },
      {
       "q": "3.2 Write an SQL query to find the sessions that no delegate has attended. Show the session number and session title. [8 marks]",
       "a": "SELECT s.SessionNo, s.SessionTitle\nFROM Session AS s\nLEFT JOIN Attendance AS a ON s.SessionNo = a.SessionNo\nWHERE a.DelegateNo IS NULL;\n\nThe LEFT JOIN keeps every session; sessions with no matching attendance row have NULLs on the ATTENDANCE side, so testing a.DelegateNo IS NULL isolates the unattended sessions."
      },
      {
       "q": "3.3 What kind of entity is ATTENDANCE, and what is its purpose in this design? [1 mark]",
       "a": "It is an associative (junction / bridge) entity: it resolves the many-to-many relationship between DELEGATE and SESSION and stores the attributes of that relationship (SeatRow, Rating)."
      },
      {
       "q": "3.4 Which clause filters groups after an aggregate has been applied (for example, to keep only tracks averaging above 4)? [1 mark]",
       "a": "The HAVING clause &mdash; it filters grouped/aggregated rows, whereas WHERE filters individual rows before grouping."
      },
      {
       "q": "3.5 The primary key of ATTENDANCE is the composite {DelegateNo, SessionNo}. Explain why both columns are needed and what other role they each play. [2 marks]",
       "a": "A delegate attends many sessions and a session is attended by many delegates, so neither column alone is unique; combined they uniquely identify one attendance record. Besides jointly forming the primary key, DelegateNo and SessionNo are each foreign keys referencing DELEGATE and SESSION respectively."
      }
     ]
    }
   ]
  }
 ]
};
