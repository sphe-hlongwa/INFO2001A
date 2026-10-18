/* Reviewed concept flashcard bank for exam.html. */
window.FLASHCARD_BANK = [
  {
    "tag": "Interaction design",
    "front": "List Shneiderman's 8 golden rules.",
    "back": "1 Strive for consistency. 2 Enable frequent users to use shortcuts. 3 Offer informative feedback. 4 Design dialogs to yield closure. 5 Offer error prevention and simple error handling. 6 Permit easy reversal of actions. 7 Support internal locus of control. 8 Reduce short-term memory load."
  },
  {
    "tag": "Interaction design",
    "front": "List Nielsen's 10 usability heuristics.",
    "back": "Visibility of system status; match between system and the real world; user control and freedom; consistency and standards; error prevention; recognition rather than recall; flexibility and efficiency of use; aesthetic and minimalist design; help users recognise, diagnose and recover from errors; help and documentation."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "DSD checklist: what must every sequence diagram show?",
    "back": "Actor as a stick figure (top left); boundary (:SomethingForm), controller (:somethingHandler) and entities (:Entity), each in a rectangle, with a colon and underlined; solid arrows with filled heads for requests; dashed arrows with open heads for returns; verb-noun camelCase messages with parameters; frames where the narrative needs them."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Which frame do you use: alt, opt, loop or ref?",
    "back": "<b>alt</b>: two or more mutually exclusive branches (if / else). <b>opt</b>: one conditional step with no else. <b>loop</b>: repeat for each item in a collection. <b>ref</b>: reuse another use case (include)."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "How is an object that is created during the use case shown in a DSD?",
    "back": "The entity box is drawn lower down, at the step where it is created, and the controller's <i>createObject(parameters)</i> arrow points at the box itself. Entities that already exist are drawn at the top."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "A DSD has loop [each line] containing opt [StockQty &lt; ReorderLevel]. With 3 lines, 2 below the level, how often is the guard tested and the message sent?",
    "back": "The guard is tested 3 times (every pass of the loop); the message inside the opt is sent 2 times (only when the guard is true)."
  },
  {
    "tag": "Reporting",
    "front": "What are the 7 fields of the report rationale table?",
    "back": "Report name, report type, report format, recipient(s), frequency, rationale, and decision(s) made as a result of the report."
  },
  {
    "tag": "Reporting",
    "front": "What must a report prototype show?",
    "back": "A header block (title, run date, filter, recipient), a body with column headings and realistic sample rows including derived fields (for example Days Outstanding = Date() &minus; SubmissionDate), and a footer with totals or counts. Back it with SQL: joins, WHERE, GROUP BY, ORDER BY."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "What do ExecuteNonQuery, ExecuteScalar and ExecuteReader return?",
    "back": "ExecuteNonQuery: the number of rows affected (INSERT/UPDATE/DELETE). ExecuteScalar: a single value (first column of first row), as an object. ExecuteReader: an OleDbDataReader positioned before the first row; call Read() for each row."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "What do ExecuteNonQuery and ExecuteScalar return when nothing matches?",
    "back": "An UPDATE or DELETE that matches no rows returns 0 from ExecuteNonQuery. A SELECT with no rows returns null from ExecuteScalar (a COUNT(*) returns 0 instead). Neither is an exception."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "Why does the order of OleDb parameters matter?",
    "back": "The ? placeholders are filled by <b>position</b>, not by name. The first parameter added goes into the first ?, and so on. Swapped parameters put values in the wrong columns or cause a data type mismatch exception."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "What does a finally block guarantee, and what is it used for?",
    "back": "It always runs, even after a return in try or an exception in catch. It is used to close the connection (conn.Close()) and restore the UI state, for example re-enabling a submit button."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "How do you build an ERD from a class diagram?",
    "back": "Rename classes to CAPITAL_SINGULAR tables; add a PK to each; place the 1-side PK in the many side as an FK; resolve each many-to-many with a bridge table whose PK is the two FKs (plus extra attributes of the association class); remove methods; label cardinalities (1..1, 0..*)."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "What is the difference between a pre-condition and a post-condition?",
    "back": "A pre-condition must be true <b>before</b> the use case starts (for example the user is logged in, the record exists). A post-condition describes the state of the system <b>after</b> it ends (records created or changed), for both the success path and each extension."
  },
  {
    "tag": "Usability & interface design",
    "front": "ComboBox: what are DisplayMember and ValueMember?",
    "back": "DisplayMember is the column the user <b>sees</b> (for example StationName). ValueMember is the column the program <b>gets</b> in SelectedValue (the foreign key, for example StationID)."
  },
  {
    "tag": "Database basics",
    "front": "What is a database (Coronel &amp; Morris)?",
    "back": "A shared, integrated computer structure that stores a collection of data (raw facts) and metadata (data about data, e.g. data types and the relationships linking the data)."
  },
  {
    "tag": "Database basics",
    "front": "What is a DBMS?",
    "back": "System software that manages the database structure and controls access to the data. It sits between the user and the database, hiding the complexity and turning requests into &ldquo;database speak&rdquo;."
  },
  {
    "tag": "Database basics",
    "front": "What is object persistence?",
    "back": "Object data is stored so that it still exists after the system stops running, and can be retrieved later &mdash; typically by storing it in a database."
  },
  {
    "tag": "Database basics",
    "front": "Name five components of a database system environment.",
    "back": "Hardware, software (OS, DBMS, applications), procedures/standards, data, and people."
  },
  {
    "tag": "Database basics",
    "front": "Name three DBMS advantages.",
    "back": "Improved data sharing and integration, minimised redundancy and inconsistency, quicker access to data (including ad hoc queries), better decision making, increased user productivity."
  },
  {
    "tag": "Database basics",
    "front": "Name three DBMS disadvantages.",
    "back": "Start-up costs, ongoing maintenance costs, vendor dependence/lock-in, security risks, critical impact if the database fails, scalability limits."
  },
  {
    "tag": "Database basics",
    "front": "What are the three stages of database design?",
    "back": "Conceptual (what data, DBMS-independent), logical (tables, keys, relationships, normalisation) and physical (storage, indexes, data types for a specific DBMS)."
  },
  {
    "tag": "Database basics",
    "front": "What does conceptual design do?",
    "back": "Creates a high-level, DBMS-independent model identifying the main entities, attributes and relationships &mdash; usually drawn as an ER diagram."
  },
  {
    "tag": "Database basics",
    "front": "What does logical design do?",
    "back": "Turns the conceptual model into a logical schema: tables, columns, data types, primary and foreign keys and relationships, with normalisation applied. Independent of physical storage."
  },
  {
    "tag": "Database basics",
    "front": "What does physical design do?",
    "back": "Creates the database in a specific DBMS: storage structures, data types, indexes, security and backup, to optimise performance and storage."
  },
  {
    "tag": "Database basics",
    "front": "Which design stage does the course prioritise, and why?",
    "back": "Logical design: create a clear, normalised structure (what data and how it is related) before deciding how to implement it physically in a specific DBMS."
  },
  {
    "tag": "Database basics",
    "front": "Why is good database design important?",
    "back": "It reduces redundancy, improves integrity and consistency, increases performance and supports scalability."
  },
  {
    "tag": "Database basics",
    "front": "Compare the hierarchical, network and relational models.",
    "back": "Hierarchical: tree, each child has one parent (1:M), hard for M:N. Network: graph, records can have many parents, supports M:N but is complex. Relational: tables of rows and columns linked by PKs and FKs, uses SQL, supports normalisation."
  },
  {
    "tag": "Database basics",
    "front": "Name three advantages of the relational model.",
    "back": "Structural independence, conceptual simplicity (tables), easier design and management, ad hoc querying with SQL, powerful DBMSs."
  },
  {
    "tag": "Database basics",
    "front": "Name three disadvantages of the relational model.",
    "back": "Hardware and software overhead, poor design is easy to produce, and it may promote &ldquo;islands of information&rdquo; (separate, unintegrated databases)."
  },
  {
    "tag": "Relational model & keys",
    "front": "Define attribute, tuple and relation in the relational model.",
    "back": "Attribute = column/field; tuple = row/record; relation = table (entity set). A single cell holds one attribute value."
  },
  {
    "tag": "Relational model & keys",
    "front": "What does it mean for an attribute to be atomic?",
    "back": "Its value cannot be subdivided. A multi-valued attribute such as address is split into atomic attributes (line 1, suburb, city, postal code)."
  },
  {
    "tag": "Relational model & keys",
    "front": "What is a derived attribute and is it stored?",
    "back": "One whose value can be calculated from other attributes (e.g. total, balance, VAT). Generally not stored, to avoid storage overhead and inconsistency."
  },
  {
    "tag": "Relational model & keys",
    "front": "What can a NULL represent?",
    "back": "An unknown value, a known but missing value, or &ldquo;not applicable&rdquo;. NULLs should be avoided where possible."
  },
  {
    "tag": "Relational model & keys",
    "front": "Define primary key.",
    "back": "An attribute (or combination) that uniquely identifies each row. Ideally a single attribute. It enforces entity integrity."
  },
  {
    "tag": "Relational model & keys",
    "front": "What is a composite key?",
    "back": "A primary key made of two or more attributes together, e.g. (OrderNo, ProductNo)."
  },
  {
    "tag": "Relational model & keys",
    "front": "Define foreign key.",
    "back": "An attribute whose value matches the primary key value in a related table. FKs create the relationships between tables and enforce referential integrity."
  },
  {
    "tag": "Relational model & keys",
    "front": "State the entity integrity rule.",
    "back": "Every table must have a primary key and its values must be unique and not NULL."
  },
  {
    "tag": "Relational model & keys",
    "front": "State the referential integrity rule.",
    "back": "A foreign key must either be NULL or match an existing primary key value in the related table."
  },
  {
    "tag": "Relational model & keys",
    "front": "When may a foreign key legitimately be NULL?",
    "back": "When its value is not yet known (e.g. a project without a manager assigned yet) or when state changes (e.g. a footballer released from a team)."
  },
  {
    "tag": "Relational model & keys",
    "front": "Define super key, candidate key and surrogate key.",
    "back": "Super key: any set of columns that uniquely identifies a row. Candidate key: a minimal attribute set that could be the PK (one is chosen). Surrogate key: an artificial key (e.g. AutoNumber) used when there is no natural PK."
  },
  {
    "tag": "Relational model & keys",
    "front": "What is an alternate key?",
    "back": "A candidate key that was not chosen as the primary key."
  },
  {
    "tag": "Relational model & keys",
    "front": "What is an index and what does it do?",
    "back": "A structure on one table, built on an index key (usually an attribute), that lets rows be found more quickly."
  },
  {
    "tag": "Relational model & keys",
    "front": "Why do data types matter?",
    "back": "They define which values can be stored, the storage needed and operations allowed; they support validation, integrity, business rules, interface choices (checkbox, date picker) and early error detection."
  },
  {
    "tag": "Relational model & keys",
    "front": "What is a controlled redundancy?",
    "back": "Deliberate duplication needed for the relational model to work &mdash; foreign keys are the standard example."
  },
  {
    "tag": "Normalisation",
    "front": "What is normalisation?",
    "back": "Designing table structures to control data redundancy and thereby avoid data anomalies; breaking a structure into new tables and assigning attributes to them."
  },
  {
    "tag": "Normalisation",
    "front": "State the objectives of normalisation.",
    "back": "Each table represents a single subject; no item is unnecessarily stored in more than one table; all non-prime attributes depend on the primary key; tables are free of insertion, update and deletion anomalies."
  },
  {
    "tag": "Normalisation",
    "front": "Define an update anomaly.",
    "back": "Duplicated data is changed in some places but not all, leaving inconsistent values."
  },
  {
    "tag": "Normalisation",
    "front": "Define an insertion anomaly.",
    "back": "Certain attributes cannot be inserted without the presence of other attributes."
  },
  {
    "tag": "Normalisation",
    "front": "Define a deletion anomaly.",
    "back": "Deleting some data causes other, unrelated attributes to be lost."
  },
  {
    "tag": "Normalisation",
    "front": "Full functional dependency?",
    "back": "A non-key attribute depends on the ENTIRE primary key (and not on part of it). This is the good form of dependency."
  },
  {
    "tag": "Normalisation",
    "front": "Partial dependency?",
    "back": "A non-key attribute depends on only PART of a composite primary key. Bad: it must be removed to reach 2NF."
  },
  {
    "tag": "Normalisation",
    "front": "Transitive dependency?",
    "back": "A non-key attribute depends on another non-key attribute, which in turn depends on the primary key (PK &rarr; A &rarr; B). Bad: removed to reach 3NF."
  },
  {
    "tag": "Normalisation",
    "front": "Rules of 1NF?",
    "back": "Single (atomic) values only, values in a column from the same domain, unique column names, row order does not matter. Steps: eliminate repeating groups, identify the PK, identify dependencies."
  },
  {
    "tag": "Normalisation",
    "front": "Rules of 2NF?",
    "back": "Already in 1NF and every non-key attribute is fully dependent on the entire primary key &mdash; all partial dependencies removed. A table with a single-attribute PK cannot have partial dependencies."
  },
  {
    "tag": "Normalisation",
    "front": "Rules of 3NF?",
    "back": "Already in 2NF and all transitive dependencies removed."
  },
  {
    "tag": "Normalisation",
    "front": "How do you fix a partial dependency?",
    "back": "Create a new table for the attributes that depend on part of the key, with that part as the new table&rsquo;s primary key; it stays behind as an FK in the original table."
  },
  {
    "tag": "Normalisation",
    "front": "How do you fix a transitive dependency?",
    "back": "Move the non-key determinant and the attributes it determines to a new table; the determinant becomes the new PK and remains as an FK in the old table."
  },
  {
    "tag": "Normalisation",
    "front": "Why must the original determinant remain in the original table when splitting?",
    "back": "It is the foreign key linking back to the new table via the FK&ndash;PK relationship."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "Read TENANT 1..1 — books — 0..* TENANT_ROOM.",
    "back": "A tenant MAY have zero to many tenant-room records; each TENANT_ROOM record WILL belong to exactly one tenant. Read both directions."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "In the room-rental ERD, TENANT_ROOM has PK = TenantID + RoomID. Why does it exist, and what limit follows from the PK as drawn?",
    "back": "It resolves the many-to-many between tenant and room into two 1:* links. As drawn, the same tenant cannot rent the same room twice, because that pair would repeat."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "“Purposes may be stored even if no rental periods are linked.” What multiplicity does this give?",
    "back": "Zero on the rental-period side, so purpose to rental is 0..* (optional). Lower bound 0 means optional."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "“A rental period can only have one defined purpose.” What does it tell you?",
    "back": "The rental period side has a mandatory 1..1 to RENTAL_PURPOSE. Business rules become the multiplicity bounds."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "A class is called “tenants” with attribute “First Name”. What is wrong?",
    "back": "Classes are singular and in CAPITALS (TENANT). Attributes are singular, lower case with a consistent prefix (tenant_first_name)."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "Which diagram is for analysis and which for design: domain model class diagram or ERD?",
    "back": "The class diagram is an analysis tool (no methods yet). The ERD is a design tool for the database."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "A class RENTAL has attributes and a method calculateTotal(). What goes in the ERD?",
    "back": "A RENTAL table with the attributes as columns. The method is code in the app, not in the ERD."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "TENANT has a stored AgeInYears derived from date of birth. What do you do?",
    "back": "Don’t store derived attributes. Calculate them when needed."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "TenantMobile holds “082…, 083…”. Which translation rule applies?",
    "back": "It is multi-valued. Split it into atomic attributes (or a separate table), one value per column."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "Rooms cannot exist without their building. Aggregation or composition?",
    "back": "Composition (filled diamond): the parts die with the whole. Aggregation (hollow diamond) is for parts that can exist alone."
  },
  {
    "tag": "Domain models & ERDs",
    "front": "The DSD’s createTenant(TenantDetails) includes TenantStatus. How is it checked against the ERD?",
    "back": "TENANT must have a TenantStatus attribute. Every entity, attribute and method in a DSD must trace to the ERD."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Flow row: “1. Requests to create tenant” (Actor column). What do you draw?",
    "back": "A solid message from Administrator to :CreateTenantForm, named requestToCreateTenant(). Every Actor row becomes a message to the Boundary. The Boundary and Controller are not in the table; you supply them."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Flow row: “1.1 Prompts for first name, last name and mobile number”. Do you draw it?",
    "back": "Usually not. The memo’s Create tenant diagram skips the prompt and starts at the actor entering the data."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Create tenant: the Form calls the Handler with the details, and only afterwards the Administrator enters them. What is wrong?",
    "back": "The order. The Actor’s EnterTenantData (a solid request) must come first, then the Form passes it on. The memo’s diagram has this slip."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Flow row: “2.1 Invokes Search tenant use case to verify no tenant with that mobile number exists”.",
    "back": "A ref frame named Search tenant. The handler sends searchTenant(MobileNumber) into it and gets the result back. Do not redraw the search inside this diagram."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Create tenant: “If tenant does not exist” and the extension “If tenant already exists”. Which frame?",
    "back": "alt. Top operand [tenant = not found], dashed divider, bottom operand [tenant = found]. The extension row is the second operand."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Flow row: “2.2 Receives newly-generated TenantID from the DBMS”.",
    "back": "A dashed return carrying the ID back to :tenantHandler, drawn just before the create call (the memo awarded a mark for it). The ID then goes into the create message."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Flow row: “2.3 Creates new tenant in the TENANT table incl. TenantID, TenantFName, TenantLName, TenantMobile, TenantStatus = ‘new’”.",
    "back": "A Create pattern: createTenant(TenantDetails) from :tenantHandler to a lowered aNew:Tenant box (the lifeline starts below it). Add a UML note TenantDetails with the five attributes and TenantStatus = “new”. The blueprint’s generic label is createObject(params)."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Where do you place the newly created object’s lifeline?",
    "back": "Between the controller and the existing entities, not at the far right. The box sits at the step where it is created, with nothing above it."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Flow row: “2.4 Confirms creation of new tenant” and the extension “2.2 Confirms no tenant creation”. How far do the dashed arrows go?",
    "back": "All the way to the Administrator, in both alt operands: handler to form, then form to the actor. The memo’s diagram stops at the form."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Create tenant post-conditions (1.2): give two.",
    "back": "Success: a new TENANT record exists with a system-generated TenantID, the entered name and mobile, and status “new”. Failure (mobile already exists): no record is created and the system confirms the tenant already exists."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Update tenant (partial diagram): which frame, guard and message complete it?",
    "back": "opt [TenantStatus == new AND hasCompletedStatus] around setTenantStatus(TenantID, “active”) to :tenant. Entry message: requestUpdateTenant(TenantID/MobileNumber)."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "In the Update tenant diagram, where should the dashed confirmation back to the caller sit?",
    "back": "Outside the opt frame. Inside it, a false guard would send nothing back to the invoking use case."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Add products to cart: “Repeat steps 1 to 1.3 for each product to add”. What goes inside the loop frame?",
    "back": "Messages 1 to 6: addProduct from Customer and Form, getPrice, createObject for the CartItem, updateStock and its confirmation. The loop is [for each product to add]. finishAdding() (Actor step 2) sits outside it."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "A dashed cartTotal arrow appears with no arrow before it. What is the fix?",
    "back": "Every dashed arrow answers a request. Actor step 2, “Finishes adding products”, is its own solid request, finishAdding(), passed from Form to Handler. The total then comes back."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Why does price := getPrice(productId) have no dashed return arrow?",
    "back": "The result is stored in a variable in the request message itself, so a separate return is not needed."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "A trainer is booked if available, otherwise the user is told it is unavailable. alt or opt?",
    "back": "alt, because there is an else outcome. opt has a single branch and no else, so it would lose the “unavailable” message."
  },
  {
    "tag": "Use case realisation & DSDs",
    "front": "Name the three objects you must add to a flow that lists only an Actor and TENANT table.",
    "back": "A Boundary (:CreateTenantForm, use case name plus Form) and a Controller (:tenantHandler, package prefix plus Handler), plus the Entity (:Tenant, singular table name). The Actor is the stick figure."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "Code: cmd.CommandText = “SELECT COUNT(*) FROM TENANT”; object r = cmd.ExecuteScalar(); What is r?",
    "back": "The first column of the first row: the count, as an object. Convert it to the expected type."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "An INSERT of one tenant runs with ExecuteNonQuery. What does it return?",
    "back": "The number of rows affected (1). It is NOT the new AutoNumber TenantID."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "UPDATE TENANT SET TenantStatus = ‘active’ WHERE TenantID = 99, but no row has ID 99. What does ExecuteNonQuery return?",
    "back": "0, with no exception. Zero rows affected means nothing matched."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "ExecuteScalar runs a SELECT that matches no tenant. What comes back?",
    "back": "null, not 0. Convert.ToInt32(null) silently returns 0, so check for null before converting."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "while (rdr.Read()) { … } over a result of three tenants. How many times does the body run?",
    "back": "Three times, once per row. Zero rows means zero iterations. A reader is forward-only and read-only."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "SQL has ? for name then ? for mobile, but the parameters were added mobile first, then name. What happens?",
    "back": "OleDb binds by position, not name. The mobile goes into the name slot and the name into the mobile slot."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "A reader is still open and you run another command on the same connection. What happens?",
    "back": "It fails. Close or dispose the reader first, because one open reader occupies the connection."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "DataAdapter.Fill has loaded a DataTable and the connection is closed. Can the grid still show rows? Do edits save?",
    "back": "Yes, the DataTable is disconnected. Edits in memory are not written to the database automatically."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "A ComboBox shows tenant names but you must save the ID. Which properties?",
    "back": "DisplayMember = the name column, ValueMember = the ID column. On save use Convert.ToInt32(cmb.SelectedValue)."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "Pick the method: count of active tenants; list every tenant; delete one tenant.",
    "back": "Count: ExecuteScalar. List: ExecuteReader. Delete: ExecuteNonQuery (check rows affected)."
  },
  {
    "tag": "Architecture & ADO.NET",
    "front": "Match Form, Handler and DomainClass to the DSD lifelines.",
    "back": "Form = boundary (:CreateTenantForm). Handler = controller (:tenantHandler). DomainClass = entity (:Tenant), the object that works with the table."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "What can be validated?",
    "back": "Presence, type/format, range/length, membership (valid record), cross-field rules, and state (is the action allowed now)."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Why validate?",
    "back": "Gives clear correction near the field, stops invalid data distorting reports, avoids preventable database failures, applies business rules consistently and preserves integrity."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Where is validation done (three boundaries)?",
    "back": "Form: immediate feedback. Application logic: authoritative business rules. Database: field types, required fields, relationships."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Why use decimal.TryParse with an ErrorProvider?",
    "back": "TryParse makes invalid text a predictable result (false) instead of a FormatException; ErrorProvider.SetError shows the message beside the control."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Good timing and messages for validation?",
    "back": "Guide on field change without nagging; check everything on Submit; keep entered values; identify the field and the correction; focus the first invalid control."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "What does CRUD stand for?",
    "back": "Create, Read, Update, Delete &mdash; each needs an identified target and an outcome."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Steps for Create.",
    "back": "Validate &rarr; INSERT with parameters &rarr; check a row was affected &rarr; refresh and confirm. The DB assigns the AutoNumber ID; prevent repeat submission while saving."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Steps for Update.",
    "back": "Identify the row by primary key (never a grid position), validate, parameter order = placeholder order, check affected rows, refresh and confirm."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Why is Delete a business decision?",
    "back": "Check related records and audit rules; a Cancelled status may preserve history better. Confirm the target; never delete by grid row number."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Search vs filter vs sort vs navigation.",
    "back": "Search finds a known record/text; filter narrows by criteria; sort changes order only; navigation moves among current results."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Meaning of LIKE patterns.",
    "back": "Prefix: Moko% ; contains: %Moko% ; one character: M_ko (ANSI-92 from OLE DB). Put the whole pattern, wildcards included, in one parameter."
  },
  {
    "tag": "Validation, CRUD & search",
    "front": "Database WHERE or local filter?",
    "back": "WHERE retrieves fewer records from Access; a DataView/BindingSource filter only narrows rows already loaded and can never find rows not loaded."
  },
  {
    "tag": "Exceptions",
    "front": "What is an exception, and when is validation better?",
    "back": "A signal that an operation cannot continue normally. Predictable invalid input belongs in validation logic, not exceptions."
  },
  {
    "tag": "Exceptions",
    "front": "Common exception types in this feature.",
    "back": "OleDbException (provider/query/database failure), InvalidOperationException (invalid state), FormatException (throwing parse), IOException/UnauthorizedAccessException (file access), plain Exception (unexpected)."
  },
  {
    "tag": "Exceptions",
    "front": "Roles of try, catch, finally and using.",
    "back": "try: code that may fail; catch (specific type): handle a known failure; finally: runs regardless &mdash; restore UI state (re-enable the button); using: disposes connection/command."
  },
  {
    "tag": "Exceptions",
    "front": "Order of catch clauses?",
    "back": "Specific exceptions before broad ones."
  },
  {
    "tag": "Exceptions",
    "front": "What should a user-facing error say?",
    "back": "What failed and a next step (retry/contact support). Do not show SQL, stack traces or file paths; log technical detail separately and keep entered values."
  },
  {
    "tag": "Interaction design",
    "front": "Name the three aspects of interaction design with an example of each.",
    "back": "Physical: keyboards, tablets, speakers, printers, cards. Conceptual: business logic, processes, metaphors and mental models (a payroll system’s terms, workflows and user categories). Perceptual: the dialogue, meaning screens, visuals, layout and sounds."
  },
  {
    "tag": "Interaction design",
    "front": "A payroll app uses terms like “pay run” and “cost centre” that match how the finance team works. Which aspect is this?",
    "back": "The conceptual aspect: the users’ mental model, their terms, processes and workflows."
  },
  {
    "tag": "Interaction design",
    "front": "Name the three core activities in the interaction design process.",
    "back": "Establishing requirements, prototyping and evaluating, repeated in iterations."
  },
  {
    "tag": "Interaction design",
    "front": "State the three core characteristics of interaction design.",
    "back": "Users are involved throughout the project. Specific usability and user experience goals are identified, clearly documented and agreed at the start. Iteration is needed through the core activities."
  },
  {
    "tag": "Interaction design",
    "front": "A team writes its usability goals after building the screens. Which core characteristic is broken?",
    "back": "Goals must be identified, documented and agreed at the beginning of the project, not added at the end."
  },
  {
    "tag": "Interaction design",
    "front": "A designer assumes all older users need big fonts. What does interaction design say?",
    "back": "One size does not fit all. Involve real users to identify incorrect assumptions about a user group, and be aware of their capabilities and sensitivities."
  },
  {
    "tag": "Interaction design",
    "front": "An international form asks for a date and a user types 5/21/2015, another 21/5/2015. What issue is this, and what is the fix?",
    "back": "Cultural differences in date format. Show the expected format (DD/MM/YYYY), use a date picker, or write the month in words (21 May 2015)."
  },
  {
    "tag": "Interaction design",
    "front": "Define accessibility.",
    "back": "The degree to which a product is usable by as many people as possible. The focus is on people with a long-term mental or physical impairment that adversely affects everyday life."
  },
  {
    "tag": "Interaction design",
    "front": "List the six usability goals.",
    "back": "Effective to use, efficient to use, safe to use, have good utility, easy to learn, easy to remember how to use."
  },
  {
    "tag": "Interaction design",
    "front": "Match the goal: (a) the admin recalls how to create a tenant after a month away; (b) the system will not delete a tenant with an active rental; (c) the system has every function the admin needs.",
    "back": "(a) Easy to remember how to use. (b) Safe to use. (c) Good utility (the right functions). Effective means it does what it should; efficient means with little time and effort."
  },
  {
    "tag": "Interaction design",
    "front": "Name four desirable and four undesirable UX goals.",
    "back": "Desirable: satisfying, enjoyable, engaging, motivating (also fun, helpful, rewarding). Undesirable: boring, frustrating, patronizing, annoying (also unpleasant, childish, gimmicky)."
  },
  {
    "tag": "Interaction design",
    "front": "A button click gives no sound, highlight or animation. Which principle is missing?",
    "back": "Feedback: sending information back to the user about what has been done, using sound, highlighting, animation or a combination."
  },
  {
    "tag": "Interaction design",
    "front": "Submit stays disabled until every required field is filled, and status offers only valid options. Which concept?",
    "back": "Constraints: restricting the possible actions so that the user cannot select incorrect options."
  },
  {
    "tag": "Interaction design",
    "front": "Save is Ctrl+S on one screen and Ctrl+K on another. What kind of inconsistency, and why does it matter?",
    "back": "Internal inconsistency within the same system. Consistent operations (Ctrl+C, Ctrl+S, Ctrl+O) make an interface easier to learn and use."
  },
  {
    "tag": "Interaction design",
    "front": "A phone keypad has 1-2-3 on top; a calculator has 7-8-9 on top. Which kind of inconsistency?",
    "back": "External inconsistency: different products follow different conventions for the same task."
  },
  {
    "tag": "Interaction design",
    "front": "A vending machine makes you press a button before inserting the money. Which principle is broken?",
    "back": "Convention and consistency. People normally insert money first, so the design contravenes a well-known convention."
  },
  {
    "tag": "Interaction design",
    "front": "A door handle affords pulling. What is a signifier, and how does it differ from an affordance?",
    "back": "An affordance is a clue about what something can do. A signifier is the design feature that alludes to that affordance (a raised, coloured Save button, a scrollbar, an icon that invites clicking)."
  },
  {
    "tag": "Interaction design",
    "front": "A recycle-bin icon deletes files and a shopping-cart icon holds items. Which term?",
    "back": "Metaphors: how the design’s language and visuals reflect the real world, which helps users form the right mental model."
  },
  {
    "tag": "Interaction design",
    "front": "List the rules for mobile design.",
    "back": "Simple navigation, large touch areas, reduce clutter, large enough text, touch controls (avoid simple web controls), simple forms, observe thumb position, consistency."
  },
  {
    "tag": "Interaction design",
    "front": "A mobile screen has tiny links close together, small grey text and a 15-field form. Which rules are broken?",
    "back": "Make touch areas large enough, make the text large enough, reduce clutter and keep the forms simple."
  },
  {
    "tag": "Interaction design",
    "front": "Match the Golden Rule: (a) a booking ends with a “Booking complete” screen; (b) the tenant’s name stays visible on every step; (c) shortcuts for frequent users.",
    "back": "(a) Design dialogs to yield closure. (b) Reduce short-term memory load. (c) Enable frequent users to use shortcuts (novices and experts); this is Nielsen’s flexibility and efficiency of use."
  },
  {
    "tag": "Usability & interface design",
    "front": "A form labels its fields TenantFName and TenantMobile. Which principle is broken and what is the fix?",
    "back": "Match the user’s language. Use “First name” and “Mobile number”, with verbs on actions (Create tenant), not column names."
  },
  {
    "tag": "Usability & interface design",
    "front": "One screen per table (TENANT, ROOM, TENANT_ROOM) to rent a room. Which design approach is this, and what is better?",
    "back": "Database-centred. Use task-centred design: one flow per user goal (Rent a room) in the user’s language, with the system handling the table relationships."
  },
  {
    "tag": "Usability & interface design",
    "front": "After a long form, the screen says only “Invalid input”. Give two fixes.",
    "back": "Show the format beside the field (“Enter a 10-digit mobile number”), mark required fields up front, validate near the input, and keep the valid entries."
  },
  {
    "tag": "Usability & interface design",
    "front": "The administrator saves a tenant and nothing on screen changes. Which Nielsen heuristic?",
    "back": "Visibility of system status. Show “Tenant created” (or the rejection reason) and prevent a duplicate submit."
  },
  {
    "tag": "Usability & interface design",
    "front": "Pick a control: room status (available, occupied, maintenance); rental purpose (long list); “send SMS reminder”; system-generated TenantID.",
    "back": "Room status: radio buttons or dropdown (small exclusive set). Purpose: dropdown. SMS reminder: checkbox. TenantID: read-only label, the system already knows it."
  },
  {
    "tag": "Usability & interface design",
    "front": "A red cross icon cancels a booking and users click it expecting to close the window. Which concept?",
    "back": "A mental-model mismatch. The icon’s signifier clashes with what users expect, so use a labelled “Cancel booking” action."
  },
  {
    "tag": "Usability & interface design",
    "front": "Errors are shown only by turning the field red. Which principle and what fix?",
    "back": "Accessibility: don’t rely on colour alone. Add an icon and text beside the field, and keep contrast and Tab order sensible."
  },
  {
    "tag": "Usability & interface design",
    "front": "A dropdown of existing tenants replaces typing a TenantID. Which Nielsen heuristic?",
    "back": "Recognition rather than recall. Users pick from visible options instead of remembering IDs."
  },
  {
    "tag": "Usability & interface design",
    "front": "Delete tenant removes the record on one click. Which rules are broken and what do you add?",
    "back": "Error prevention and easy reversal (Shneiderman: simple error handling and permit easy reversal). Add a confirmation naming the tenant, a safe default of Cancel, and Undo if possible."
  },
  {
    "tag": "Usability & interface design",
    "front": "A flat grey rectangle labelled Save does not look clickable. Name the missing concept.",
    "back": "A signifier. Make the affordance perceivable with a raised or coloured button, and make it the primary action while Cancel stays secondary."
  },
  {
    "tag": "Usability & interface design",
    "front": "Which is a usability goal and which a UX goal: “a new admin creates a tenant in under 2 minutes” and “using the system feels enjoyable”?",
    "back": "The first is a usability goal (efficiency, measurable). The second is a UX goal (subjective feeling)."
  },
  {
    "tag": "Usability & interface design",
    "front": "Storyboard for Create tenant: which screens do you show?",
    "back": "Screen 1: the details form. Screen 2a: “tenant already exists” message. Screen 2b: confirmation with the new tenant. Add navigation arrows and what each action leads to."
  },
  {
    "tag": "Usability & interface design",
    "front": "Section D wireframe: what must a form sketch show?",
    "back": "Title, labelled fields with the right controls, required markers, primary and secondary buttons, and a place for feedback and error messages."
  },
  {
    "tag": "Usability & interface design",
    "front": "Name Shneiderman&rsquo;s Eight Golden Rules.",
    "back": "Strive for consistency; enable shortcuts for frequent users; offer informative feedback; design dialogues to yield closure; offer simple error handling; permit easy reversal of actions; support internal locus of control; reduce short-term memory load."
  },
  {
    "tag": "Usability & interface design",
    "front": "Name Nielsen&rsquo;s ten heuristics.",
    "back": "Visibility of system status; match system and real world; user control and freedom; consistency and standards; error prevention; recognition rather than recall; flexibility and efficiency; aesthetic and minimalist design; help users recognise, diagnose and recover from errors; help and documentation."
  },
  {
    "tag": "Reporting",
    "front": "Report: tenants still “new” 31 or more days after their submission date. Which type and what must it show?",
    "back": "An exception report. Show only matching tenants, the days pending, enough context to act, sorted by urgency, with the report date."
  },
  {
    "tag": "Reporting",
    "front": "Choose a visual: rentals per month this year; rentals by room type; exact details of one tenant; overall occupancy.",
    "back": "Rentals per month: line. By room type: bar. Exact tenant details: table. Overall occupancy: KPI."
  },
  {
    "tag": "Reporting",
    "front": "Fill the report rationale table for the 31-day exception report.",
    "back": "Name, type (exception), format (table), recipient (administrator), frequency (e.g. weekly), rationale (late tenants), decision (follow up or cancel)."
  },
  {
    "tag": "Reporting",
    "front": "How do you turn “31 or more days pending” into data logic?",
    "back": "Population: tenants. Condition: TenantStatus = ‘new’. Threshold: report date − submission date ≥ 31. Join only the entities needed."
  },
  {
    "tag": "Reporting",
    "front": "A report is titled “Tenants”, lists every column, and has no date. Fix it.",
    "back": "Title with subject and period, only relevant columns, show the report date and filters, and prioritise the exceptions."
  },
  {
    "tag": "Reporting",
    "front": "What does traceability mean for the “days pending” field?",
    "back": "It traces back to the submission date in the data model, the report date calculation, and the decision it supports."
  },
  {
    "tag": "Normalisation",
    "front": "What does First Normal Form (1NF) require?",
    "back": "Every attribute holds a single, atomic value and there are no repeating groups within a row."
  },
  {
    "tag": "Normalisation",
    "front": "What does Second Normal Form (2NF) remove?",
    "back": "Partial dependencies - non-key attributes that depend on only part of a composite primary key, not the whole key."
  },
  {
    "tag": "Normalisation",
    "front": "What does Third Normal Form (3NF) remove?",
    "back": "Transitive dependencies - non-key attributes that depend on another non-key attribute rather than directly on the primary key."
  },
  {
    "tag": "Normalisation",
    "front": "Define a partial dependency.",
    "back": "When a non-key attribute depends on only one part of a composite primary key, rather than the full key."
  },
  {
    "tag": "Normalisation",
    "front": "Define a transitive dependency.",
    "back": "When a non-key attribute depends on another non-key attribute, which in turn depends on the primary key."
  },
  {
    "tag": "Normalisation",
    "front": "Define a functional dependency.",
    "back": "Attribute B is functionally dependent on A if each value of A is associated with exactly one value of B."
  },
  {
    "tag": "Normalisation",
    "front": "A table’s primary key is a single column. Can it have a partial dependency?",
    "back": "No - a partial dependency can only exist against a composite (multi-column) key. With a single-column key, every non-key attribute automatically depends on the whole key."
  },
  {
    "tag": "Normalisation",
    "front": "Table T has key {A,B}. Attribute C depends only on A. Which normal form is violated?",
    "back": "2NF is violated - C has a partial dependency on part of the composite key (A) rather than the whole key {A,B}."
  },
  {
    "tag": "Normalisation",
    "front": "Table T has a single-attribute key A, and a non-key attribute B determines another non-key attribute C (A→B→C). What’s the highest normal form T satisfies?",
    "back": "2NF only. No partial dependency is possible (single-attribute key), but B→C is a transitive dependency, which violates 3NF."
  },
  {
    "tag": "Normalisation",
    "front": "What does BCNF (Boyce-Codd Normal Form) require beyond 3NF?",
    "back": "Every determinant (the left-hand side of any functional dependency) must be a candidate key - even ones already in 3NF can still fail this if a non-candidate-key attribute determines part of the key."
  },
  {
    "tag": "Normalisation",
    "front": "Why does normalization reduce redundancy?",
    "back": "Each fact is decomposed so it is stored in exactly one place - no fact is duplicated across multiple rows or tables."
  },
  {
    "tag": "Keys & integrity (SQL)",
    "front": "Primary key vs. foreign key?",
    "back": "A primary key uniquely identifies each row in its own table. A foreign key is an attribute in one table that references the primary key of another."
  },
  {
    "tag": "Keys & integrity (SQL)",
    "front": "What is a candidate key?",
    "back": "Any attribute (or minimal set of attributes) that could uniquely identify a row; one candidate key is chosen as the primary key."
  },
  {
    "tag": "Keys & integrity (SQL)",
    "front": "Natural key vs. surrogate key?",
    "back": "A natural key is derived from real-world data (e.g. an ID number) and can change over time. A surrogate key is a system-generated identifier (e.g. auto-increment) with no business meaning, chosen for stability."
  },
  {
    "tag": "Keys & integrity (SQL)",
    "front": "Why prefer a surrogate key over a natural key as a primary key?",
    "back": "Natural keys can change (names, phone numbers, even ID numbers get reissued), which breaks stability for a key that other tables reference via foreign keys."
  },
  {
    "tag": "Keys & integrity (SQL)",
    "front": "What is entity integrity?",
    "back": "The rule that every table must have a primary key, and that primary key value can never be NULL."
  },
  {
    "tag": "Keys & integrity (SQL)",
    "front": "What is referential integrity?",
    "back": "A foreign key value must either match an existing primary key value in the referenced table, or be NULL."
  },
  {
    "tag": "Keys & integrity (SQL)",
    "front": "What is domain integrity?",
    "back": "The rule restricting the values a column may hold to a valid data type, range, or defined set of values."
  },
  {
    "tag": "Keys & integrity (SQL)",
    "front": "Can a foreign key column contain NULL?",
    "back": "Yes, unless the relationship is mandatory. A NULL foreign key means \"this row currently has no related row\" (e.g. an optional relationship)."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "Crow's foot: one and only one?",
    "back": "A single straight tick mark across the relationship line - mandatory, cardinality of exactly one."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "Crow's foot: zero or many?",
    "back": "A circle followed by a crow's foot (fork) - optional, cardinality of many."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "What is a weak entity?",
    "back": "An entity that cannot be uniquely identified by its own attributes alone and depends on a relationship with another (owner) entity for its identity."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "How do you resolve a many-to-many relationship?",
    "back": "Introduce an associative (bridge/junction) entity that holds the foreign keys of both original entities, turning the M:N into two 1:M relationships."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "What is an associative entity used for?",
    "back": "To store attributes that describe the relationship itself - data that only makes sense in the context of both linked entities together (e.g. a grade, quantity, or booking date)."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "How do you decide if an attribute belongs on the associative entity rather than either parent entity?",
    "back": "Ask whether the value only makes sense for a specific pairing (e.g. \"grade in this course, for this student\") rather than being a fact about either entity alone."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "Mandatory one vs. optional one in crow's foot notation?",
    "back": "Mandatory one = a single tick bar. Optional one = a circle plus a tick bar, meaning the relationship may or may not exist, but if it does, it’s exactly one."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "Conceptual vs. logical vs. physical data model?",
    "back": "Conceptual: business-level entities and relationships, no technical detail. Logical: relational schema with normalized tables and keys. Physical: implementation detail - data types, indexes, storage structures."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "In a business-rule sentence, what phrase signals an OPTIONAL relationship end?",
    "back": "Wording like \"may also exist without\" signals a zero minimum cardinality. \"Must be associated with at least one\" signals mandatory instead."
  },
  {
    "tag": "ER modelling (SQL)",
    "front": "What is a recursive relationship?",
    "back": "A relationship where an entity is related to another instance of itself - e.g. an EMPLOYEE who is managed by another EMPLOYEE."
  },
  {
    "tag": "SQL basics",
    "front": "What does SELECT with column names implement?",
    "back": "Projection - choosing which columns appear in the result."
  },
  {
    "tag": "SQL basics",
    "front": "What does the WHERE clause implement?",
    "back": "Selection (restriction) - choosing which rows appear in the result based on a condition."
  },
  {
    "tag": "SQL basics",
    "front": "COUNT(*) vs COUNT(column)?",
    "back": "COUNT(*) counts all rows, NULLs included. COUNT(column) counts only rows where that column is not NULL."
  },
  {
    "tag": "SQL basics",
    "front": "What does BETWEEN do?",
    "back": "Selects values within an inclusive range, e.g. WHERE Price BETWEEN 100 AND 300 includes both 100 and 300."
  },
  {
    "tag": "SQL basics",
    "front": "Any arithmetic involving NULL?",
    "back": "Always evaluates to NULL - NULL represents an unknown value, so the result of the calculation is also unknown."
  },
  {
    "tag": "SQL basics",
    "front": "GROUP BY vs HAVING?",
    "back": "GROUP BY collapses rows into groups for aggregation. HAVING filters those groups after aggregation, the way WHERE filters individual rows before it."
  },
  {
    "tag": "SQL basics",
    "front": "What does DISTINCT do?",
    "back": "Removes duplicate rows from the result set, keeping only one copy of each unique row."
  },
  {
    "tag": "SQL basics",
    "front": "INNER JOIN vs LEFT JOIN?",
    "back": "INNER JOIN returns only rows with matches in both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right, with NULLs where there’s no match."
  },
  {
    "tag": "SQL basics",
    "front": "What is the default sort direction for ORDER BY?",
    "back": "Ascending (ASC) - from smallest/earliest to largest/latest - unless DESC is specified."
  },
  {
    "tag": "SQL basics",
    "front": "Why can’t you filter on an aggregate function result using WHERE?",
    "back": "WHERE filters individual rows before grouping happens, but an aggregate result only exists after grouping - so HAVING must be used instead."
  },
  {
    "tag": "Access SQL",
    "front": "What does IIf(condition, true_value, false_value) do?",
    "back": "Access’s inline conditional function - returns one value if the condition is true, another if false. Like a compact CASE expression."
  },
  {
    "tag": "Access SQL",
    "front": "What does Nz(expression, value_if_null) do?",
    "back": "Returns a substitute value when the expression is NULL; otherwise returns the expression’s actual value."
  },
  {
    "tag": "Access SQL",
    "front": "Access wildcard for \"any number of characters\"?",
    "back": "The asterisk (*), used with LIKE - e.g. LIKE 'Jo*' matches Jonathan, Joe, Jones, etc."
  },
  {
    "tag": "Access SQL",
    "front": "Access wildcard for \"exactly one character\"?",
    "back": "The question mark (?) - e.g. LIKE 'a?e' matches \"ace\" and \"are\" but not \"apple\"."
  },
  {
    "tag": "Access SQL",
    "front": "How do you write a date literal in Access SQL?",
    "back": "Enclosed in hash symbols - e.g. #2026-07-01# or #07/01/2026#."
  },
  {
    "tag": "Access SQL",
    "front": "What does TOP 5 do in an Access SELECT?",
    "back": "Restricts the result set to the first 5 rows, based on the current ORDER BY (or table storage order if none is specified)."
  },
  {
    "tag": "Access SQL",
    "front": "Format(SomeDate, 'd-mmmm-yyyy') on 3 June 2005 would output what?",
    "back": "\"3-June-2005\" - the lowercase d/mmmm/yyyy tokens control day number, full month name, and 4-digit year."
  },
  {
    "tag": "Access SQL",
    "front": "What is a correlated subquery?",
    "back": "A subquery that references a column from the outer query, so it re-evaluates once per row of the outer query rather than running once overall."
  },
  {
    "tag": "Access SQL",
    "front": "DateAdd('d', -30, [SomeDate]) does what?",
    "back": "Returns the date 30 days before SomeDate - the 'd' interval code means the offset is in days."
  },
  {
    "tag": "Access SQL",
    "front": "What does the & operator do in Access SQL?",
    "back": "Concatenates (joins together) two text values, e.g. [FirstName] & \" \" & [LastName]."
  },
  {
    "tag": "Anomalies & design",
    "front": "What is an insertion anomaly?",
    "back": "You cannot add a new fact (e.g. a new product) because some unrelated piece of data (e.g. an order) doesn’t exist yet to attach it to."
  },
  {
    "tag": "Anomalies & design",
    "front": "What is an update anomaly?",
    "back": "A single real-world fact is stored in multiple rows, so changing it requires updating every row consistently - otherwise the data becomes contradictory."
  },
  {
    "tag": "Anomalies & design",
    "front": "What is a deletion anomaly?",
    "back": "Deleting one fact (e.g. the last order for a customer) unintentionally deletes other data (e.g. the customer’s own details) that should have persisted."
  },
  {
    "tag": "Anomalies & design",
    "front": "When would you deliberately denormalize a database?",
    "back": "To improve read/report performance by reducing the number of joins needed, accepting some controlled redundancy in exchange for speed."
  },
  {
    "tag": "Anomalies & design",
    "front": "What’s the main risk of denormalization?",
    "back": "Update anomalies can return, since the same fact may again be stored in multiple places that must be kept in sync manually."
  },
  {
    "tag": "Anomalies & design",
    "front": "A table cannot register a new store until it has made a sale. Which anomaly is this?",
    "back": "An insertion anomaly - you’re blocked from inserting a new fact (the store) because it depends on an unrelated fact (a sale) existing first."
  }
];
