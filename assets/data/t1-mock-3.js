/* Test 1 mock paper 3. Rendered by assets/js/mock-paper.js on mock-test1/mock3.html.
   Image paths are relative to the page (mock-test1/), hence the leading ../ */
window.MOCK_PAPER = {
 "title": "Mock 3 - Keys, Hierarchies & SQL",
 "subtitle": "Second- and third-normal-form decomposition of a student-results table, ER design of the result, and Microsoft Access SQL over an organisational hierarchy with a recursive relationship.",
 "summary": "2NF/3NF, ER diagrams and hierarchy SQL.",
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
       "Which normalisation concern does 4th Normal Form (4NF) primarily address?",
       [
        "Partial dependencies on a composite key",
        "Transitive dependencies between non-key attributes",
        "Independent multivalued dependencies within a single relation",
        "Missing primary keys"
       ],
       2,
       "4NF removes independent multivalued dependencies, which can cause redundancy even in a table that is already in BCNF."
      ],
      [
       "In ER modelling, what is a 'recursive relationship'?",
       [
        "A relationship between three or more entities",
        "A relationship that connects an entity type to itself",
        "A relationship with no attributes",
        "A relationship that can never be many-to-many"
       ],
       1,
       "A recursive (self-referencing) relationship links instances of the same entity type to one another, e.g. an EMPLOYEE who manages other EMPLOYEEs."
      ],
      [
       "Which SQL join returns all rows from the left table together with matching rows from the right table, inserting NULLs for the right-hand columns where there is no match?",
       [
        "INNER JOIN",
        "RIGHT JOIN",
        "LEFT JOIN",
        "CROSS JOIN"
       ],
       2,
       "A LEFT JOIN keeps every row from the left table regardless of whether a match exists in the right table."
      ],
      [
       "Which SQL keyword combines the result sets of two separate SELECT queries into one, removing duplicate rows by default?",
       [
        "JOIN",
        "UNION",
        "MERGE",
        "APPEND"
       ],
       1,
       "UNION stacks the results of two compatible SELECT queries and removes duplicates; UNION ALL keeps duplicates."
      ],
      [
       "A table made up of two foreign keys (together forming its composite primary key) that exists purely to resolve a many-to-many relationship is known as a(n) __________.",
       [
        "Weak entity",
        "Associative (junction/bridge) entity",
        "Surrogate table",
        "Recursive entity"
       ],
       1,
       "An associative entity sits between the two related entities and stores the linking foreign keys, resolving the many-to-many relationship into two one-to-many relationships."
      ],
      [
       "Storing a value that could instead be calculated on demand from other columns (e.g. storing Age directly instead of deriving it from DateOfBirth) is an example of __________.",
       [
        "Normalisation",
        "A candidate key",
        "Denormalisation / derived-data redundancy",
        "Referential integrity"
       ],
       2,
       "Storing a derivable value directly introduces redundancy that must be kept in sync, which is a form of denormalisation."
      ],
      [
       "When a query includes both a WHERE clause and a HAVING clause alongside GROUP BY, what is the correct description of how they differ?",
       [
        "WHERE filters grouped results; HAVING filters individual rows",
        "WHERE filters individual rows before grouping; HAVING filters groups after grouping",
        "They are interchangeable and always produce the same result",
        "HAVING can only be used without GROUP BY"
       ],
       1,
       "WHERE operates on individual rows before they are grouped, while HAVING operates on the aggregated groups afterwards."
      ],
      [
       "Which SQL clause guarantees the order in which rows are returned by a query?",
       [
        "GROUP BY",
        "ORDER BY",
        "HAVING",
        "DISTINCT"
       ],
       1,
       "Without an ORDER BY clause, the order of returned rows is not guaranteed by the SQL standard, regardless of insertion order."
      ],
      [
       "Given the relationship DEPARTMENT (1) ↔ (0..*) EMPLOYEE, what does the '1' on the DEPARTMENT side mean?",
       [
        "A department may have zero or one employees",
        "Every employee belongs to exactly one department",
        "A department must have at least one employee",
        "An employee may belong to many departments"
       ],
       1,
       "The '1' cardinality on the DEPARTMENT side of the relationship means each EMPLOYEE row is associated with exactly one DEPARTMENT."
      ],
      [
       "Which Access wildcard in a LIKE pattern matches zero or more characters?",
       [
        "?",
        "#",
        "*",
        "%"
       ],
       2,
       "In Access SQL, * matches zero or more characters (ANSI-89 syntax); # matches a single digit and ? matches a single character."
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
     "scenario": "A university records module marks in the single unnormalised relation <b>RESULT(<u>StudentID</u>, StudentName, ProgrammeCode, ProgrammeName, <u>ModuleID</u>, ModuleName, Credits, Mark)</b>. A row is uniquely identified by the combination of StudentID and ModuleID (the two underlined attributes). Each student is enrolled on one programme, and each module has a fixed credit value. The functional dependencies are shown in the diagram below.",
     "diagram": "<div class=\"diagram-wrap\"><img src=\"../assets/img/t1-mock/mock3-normalisation.png\" alt=\"RESULT dependency diagram\"></div>",
     "qs": [
      {
       "q": "1.1 List and classify every functional dependency in RESULT as a partial, transitive or full-key dependency. [5 marks]",
       "a": "StudentID &rarr; StudentName, ProgrammeCode <i>(partial &mdash; depends on part of the key)</i><br>ProgrammeCode &rarr; ProgrammeName <i>(transitive &mdash; a non-key attribute determines another)</i><br>ModuleID &rarr; ModuleName, Credits <i>(partial &mdash; depends on part of the key)</i><br>{StudentID, ModuleID} &rarr; Mark <i>(full-key / proper &mdash; depends on the whole key)</i>"
      },
      {
       "q": "1.2 Normalise RESULT to Second Normal Form (2NF), removing the partial dependencies. Show each relation with its primary key. [7 marks]",
       "a": "Split off the attributes that depend on only part of the composite key {StudentID, ModuleID}:<br>STUDENT(<u>StudentID</u>, StudentName, ProgrammeCode, ProgrammeName) &mdash; removes the partial dependency on StudentID.<br>MODULE(<u>ModuleID</u>, ModuleName, Credits) &mdash; removes the partial dependency on ModuleID.<br>RESULT(<u>StudentID, ModuleID</u>, Mark) &mdash; Mark depends on the whole key, so it stays."
      },
      {
       "q": "1.3 Extend your answer to Third Normal Form (3NF), giving fully labelled relations. [3 marks]",
       "a": "Remove the transitive dependency ProgrammeCode &rarr; ProgrammeName from STUDENT:<br>PROGRAMME(<u>ProgrammeCode</u>, ProgrammeName).<br>STUDENT(<u>StudentID</u>, StudentName, <i>ProgrammeCode</i>) &mdash; now in 3NF (ProgrammeCode is a foreign key).<br>MODULE(<u>ModuleID</u>, ModuleName, Credits) and RESULT(<u>StudentID, ModuleID</u>, Mark) were already in 3NF."
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
     "scenario": "Use your 3NF answer above and the following business rules to design the database. Each student is enrolled on exactly one (1) programme, and a programme must have at least one (1) student. A student may take many modules and a module may be taken by many students; each result records the mark for one student on one module. A student must have at least one (1) result, and a module must have at least one (1) result.",
     "qs": [
      {
       "q": "2.1 Draw a fully labelled ERD for the normalised structure, including all attributes and primary/foreign keys. [10 marks]",
       "a": "PROGRAMME(<u>ProgrammeCode</u> PK, ProgrammeName) &mdash; 1 &harr; 1..* &mdash; STUDENT.<br>STUDENT(<u>StudentID</u> PK, StudentName, <i>ProgrammeCode</i> FK) &mdash; 1 &harr; 1..* &mdash; RESULT.<br>MODULE(<u>ModuleID</u> PK, ModuleName, Credits) &mdash; 1 &harr; 1..* &mdash; RESULT.<br>RESULT(<u>StudentID, ModuleID</u>, Mark) is the <b>associative (junction) entity</b> resolving the many-to-many between STUDENT and MODULE; its composite primary key is the two foreign keys StudentID and ModuleID."
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
     "intro": "Consider the following ERD for an organisation's HR database (shown below). The company is divided into divisions; each division contains many departments, and each department employs many staff, while every employee works in exactly one department. In addition, an employee may manage many other employees, and each employee reports to at most one manager who is also an employee &mdash; a recursive (self-referencing) relationship. The tables are: DIVISION(<u>DivisionNo</u>, DivisionName), DEPARTMENT(<u>DeptNo</u>, DeptName, DivisionNo) and EMPLOYEE(<u>EmpNo</u>, EmpName, Salary, DeptNo, ManagerNo), where ManagerNo holds the EmpNo of the employee's manager.",
     "diagram": "<div class=\"diagram-wrap\"><img src=\"../assets/img/t1-mock/mock3-erd-sql.png\" alt=\"Organisation ERD\"></div>",
     "scenario2": "<b>Access requirement.</b> Use Microsoft Access SQL. Use <code class=\"inline\">TOP</code>, <code class=\"inline\">Nz()</code>, <code class=\"inline\">IIf()</code>, Access wildcards and Access date literals where appropriate.",
     "qs": [
      {
       "q": "3.1 Write an SQL query to list every manager together with how many staff report directly to them. Show the manager's employee number, the manager's name and the count (heading 'Direct Reports'), including only employees who manage more than 2 staff, sorted from most reports to fewest. [8 marks]",
       "a": "SELECT m.EmpNo, m.EmpName, Count(e.EmpNo) AS [Direct Reports]\nFROM Employee AS e\n     INNER JOIN Employee AS m ON e.ManagerNo = m.EmpNo\nGROUP BY m.EmpNo, m.EmpName\nHAVING Count(e.EmpNo) > 2\nORDER BY Count(e.EmpNo) DESC;\n\nEMPLOYEE is joined to itself (a self-join): alias e is the subordinate, alias m is the manager matched through e.ManagerNo = m.EmpNo."
      },
      {
       "q": "3.2 Write an SQL query to show, for each division, the division name and the total salary bill of all employees working in that division (heading 'Salary Bill'), sorted alphabetically by division name. [8 marks]",
       "a": "SELECT dv.DivisionName, Sum(e.Salary) AS [Salary Bill]\nFROM (Division AS dv\n      INNER JOIN Department AS dp ON dv.DivisionNo = dp.DivisionNo)\n      INNER JOIN Employee AS e ON dp.DeptNo = e.DeptNo\nGROUP BY dv.DivisionName\nORDER BY dv.DivisionName;"
      },
      {
       "q": "3.3 What name is given to a relationship in which an entity type (such as EMPLOYEE) is related to itself? [1 mark]",
       "a": "A recursive (self-referencing) relationship."
      },
      {
       "q": "3.4 Write the condition that selects the employee(s) at the very top of the hierarchy, i.e. who report to no manager. [1 mark]",
       "a": "WHERE ManagerNo IS NULL &mdash; a NULL ManagerNo means the employee has no manager."
      },
      {
       "q": "3.5 Explain how the recursive 'manages' relationship is implemented in the EMPLOYEE table using a single column, and what that column contains. [2 marks]",
       "a": "It is implemented with a self-referencing foreign key, ManagerNo, in the EMPLOYEE table. ManagerNo stores the EmpNo of that employee's manager, who is another row in the same EMPLOYEE table; a NULL means the employee has no manager. This lets one table represent the whole management hierarchy."
      }
     ]
    }
   ]
  }
 ]
};
