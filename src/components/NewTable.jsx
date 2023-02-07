// import React from 'react'
// import styled from 'styled-components'
// import { useTable, useFilters, useGlobalFilter,usePagination, useAsyncDebounce } from 'react-table'
// import makeData from "./TableData"

// import {matchSorter} from 'match-sorter'


// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `

// // Define a default UI for filtering
// function GlobalFilter({
//     globalFilter,
//     setGlobalFilter,
//     preGlobalFilteredRows,

//   }) {
//     const count = preGlobalFilteredRows.length
//     const [value, setValue] = React.useState(globalFilter)
//     const onChange = useAsyncDebounce(value => {
//       setGlobalFilter(value || undefined)
//     }, 200)
  
//     return (
//       <span>
//         Search:{' '}
//         <input
//           value={value || ""}
//           onChange={e => {
//             setValue(e.target.value);
//             onChange(e.target.value);
//           }}
//           placeholder={`${count} records...`}
//           style={{
//             fontSize: '1.1rem',
//             border: '0',
//           }}
//         />
//       </span>
//     )
//   }
//   // Define a default UI for filtering
// function DefaultColumnFilter({
//     column: { filterValue, preFilteredRows, setFilter },
//   }) {
//     const count = preFilteredRows.length
  
//     return (
//       <input
//         value={filterValue || ''}
//         onChange={e => {
//           setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
//         }}
//         placeholder={`Search ${count} records...`}
//       />
//     )
//   }
  
//   // This is a custom filter UI for selecting
//   // a unique option from a list
//   function SelectColumnFilter({
//     column: { filterValue, setFilter, preFilteredRows, id },
//   }) {
//     // Calculate the options for filtering
//     // using the preFilteredRows
//     const options = React.useMemo(() => {
//       const options = new Set()
//       preFilteredRows.forEach(row => {
//         options.add(row.values[id])
//       })
//       return [...options.values()]
//     }, [id, preFilteredRows])
  
//     // Render a multi-select box
//     return (
//       <select
//         value={filterValue}
//         onChange={e => {
//           setFilter(e.target.value || undefined)
//         }}
//       >
//         <option value="">All</option>
//         {options.map((option, i) => (
//           <option key={i} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     )
//   }
  
//   // This is a custom filter UI that uses a
//   // slider to set the filter value between a column's
//   // min and max values
//   function SliderColumnFilter({
//     column: { filterValue, setFilter, preFilteredRows, id },
//   }) {
//     // Calculate the min and max
//     // using the preFilteredRows
  
//     const [min, max] = React.useMemo(() => {
//       let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//       let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//       preFilteredRows.forEach(row => {
//         min = Math.min(row.values[id], min)
//         max = Math.max(row.values[id], max)
//       })
//       return [min, max]
//     }, [id, preFilteredRows])
  
//     return (
//       <>
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={filterValue || min}
//           onChange={e => {
//             setFilter(parseInt(e.target.value, 10))
//           }}
//         />
//         <button onClick={() => setFilter(undefined)}>Off</button>
//       </>
//     )
//   }
  
//   // This is a custom UI for our 'between' or number range
//   // filter. It uses two number boxes and filters rows to
//   // ones that have values between the two
//   function NumberRangeColumnFilter({
//     column: { filterValue = [], preFilteredRows, setFilter, id },
//   }) {
//     const [min, max] = React.useMemo(() => {
//       let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//       let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//       preFilteredRows.forEach(row => {
//         min = Math.min(row.values[id], min)
//         max = Math.max(row.values[id], max)
//       })
//       return [min, max]
//     }, [id, preFilteredRows])
  
//     return (
//       <div
//         style={{
//           display: 'flex',
//         }}
//       >
//         <input
//           value={filterValue[0] || ''}
//           type="number"
//           onChange={e => {
//             const val = e.target.value
//             setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
//           }}
//           placeholder={`Min (${min})`}
//           style={{
//             width: '70px',
//             marginRight: '0.5rem',
//           }}
//         />
//         to
//         <input
//           value={filterValue[1] || ''}
//           type="number"
//           onChange={e => {
//             const val = e.target.value
//             setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
//           }}
//           placeholder={`Max (${max})`}
//           style={{
//             width: '70px',
//             marginLeft: '0.5rem',
//           }}
//         />
//       </div>
//     )
//   }
  
//   function fuzzyTextFilterFn(rows, id, filterValue) {
//     return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
//   }
  
//   // Let the table remove the filter if the string is empty
//   fuzzyTextFilterFn.autoRemove = val => !val
  

// // Let's add a fetchData method to our Table component that will be used to fetch
// // new data when pagination state changes
// // We can also add a loading state to let our table know it's loading new data
// function Table(
//     {
//   columns,
//   data,
//   fetchData,
//   loading,
//   pageCount: controlledPageCount,
// })
//  { const filterTypes = React.useMemo(
//     () => ({
//       // Add a new fuzzyTextFilterFn filter type.
//       fuzzyText: fuzzyTextFilterFn,
//       // Or, override the default text filter to use
//       // "startWith"
//       text: (rows, id, filterValue) => {
//         return rows.filter(row => {
//           const rowValue = row.values[id]
//           return rowValue !== undefined
//             ? String(rowValue)
//                 .toLowerCase()
//                 .startsWith(String(filterValue).toLowerCase())
//             : true
//         })
//       },
//     }),
//     []
//   )
//   const {
//     getTableProps,
//     getTableBodyProps,
//     prepareRow,

//     headerGroups,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     rows,
//     state,
//     visibleColumns,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//     // Get the state from the instance
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 }, // Pass our hoisted table state
//       manualPagination: true, // Tell the usePagination
//       // hook that we'll handle our own data fetching
//       // This means we'll also have to provide our own
//       // pageCount.
//       pageCount: controlledPageCount,
//     },
//     useGlobalFilter, // useGlobalFilter!

//     useFilters, // useFilters!
//     usePagination,

//   )

//   // Listen for changes in pagination and use the state to fetch our new data
//   React.useEffect(() => {
//     fetchData({ pageIndex, pageSize })
//   }, [fetchData, pageIndex, pageSize])

//   // Render the UI for your table
//   return (
//     <>
//       <pre>
//         <code>
//           {JSON.stringify(
//             {
//               pageIndex,
//               pageSize,
//               pageCount,
//               canNextPage,
//               canPreviousPage,
//             },
//             null,
//             2
//           )}
//         </code>
//       </pre>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>
//                   {column.render('Header')}

//                   <span>
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? ' 🔽'
//                         : ' 🔼'
//                       : ''}
//                   </span>

//                   {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}

//                 </th>
//               ))}
//             </tr>
//           ))}
//             <th
//               colSpan={visibleColumns.length}
//               style={{
//                 textAlign: 'left',
//               }}
//             >
//               <GlobalFilter
//                 preGlobalFilteredRows={preGlobalFilteredRows}
//                 globalFilter={state.globalFilter}
//                 setGlobalFilter={setGlobalFilter}
//               />
//             </th>
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row)
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 })}
//               </tr>
//             )
//           })}
//           <tr>
//             {loading ? (
//               // Use our custom loading state to show a loading indicator
//               <td colSpan="10000">Loading...</td>
//             ) : (
//               <td colSpan="10000">
//                 Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
//                 results
//               </td>
//             )}
//           </tr>
//         </tbody>
//       </table>
//       {/* 
//         Pagination can be built however you'd like. 
//         This is just a very basic UI implementation:
//       */}
//       <div className="pagination">
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {'<<'}
//         </button>{' '}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {'<'}
//         </button>{' '}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {'>'}
//         </button>{' '}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {'>>'}
//         </button>{' '}
//         <span>
//           Page{' '}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>{' '}
//         </span>
//         <span>
//           | Go to page:{' '}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0
//               gotoPage(page)
//             }}
//             style={{ width: '100px' }}
//           />
//         </span>{' '}
//         <select
//           value={pageSize}
//           onChange={e => {
//             setPageSize(Number(e.target.value))
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   )
// }
// function filterGreaterThan(rows, id, filterValue) {
//     return rows.filter(row => {
//       const rowValue = row.values[id]
//       return rowValue >= filterValue
//     })
//   }

//   filterGreaterThan.autoRemove = val => typeof val !== 'number'


// // Let's simulate a large dataset on the server (outside of our component)
// const serverData = makeData(10000)

// function NewTable() {
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Name',
//         columns: [
//           {
//             Header: 'First Name',
//             accessor: 'firstName',
//           },
//           {
//             Header: 'Last Name',
//             accessor: 'lastName',
//           },
//         ],
//       },
//       {
//         Header: 'Info',
//         columns: [
//           {
//             Header: 'Age',
//             accessor: 'age',
//           },
//           {
//             Header: 'Visits',
//             accessor: 'visits',
//           },
//           {
//             Header: 'Status',
//             accessor: 'status',
//           },
//           {
//             Header: 'Profile Progress',
//             accessor: 'progress',
//           },
//         ],
//       },
//     ],
//     []
//   )

//   // We'll start our table without any data
//   const [data, setData] = React.useState([])
//   const [loading, setLoading] = React.useState(false)
//   const [pageCount, setPageCount] = React.useState(0)
//   const fetchIdRef = React.useRef(0)

//   const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
//     // This will get called when the table needs new data
//     // You could fetch your data from literally anywhere,
//     // even a server. But for this example, we'll just fake it.

//     // Give this fetch an ID
//     const fetchId = ++fetchIdRef.current

//     // Set the loading state
//     setLoading(true)

//     // We'll even set a delay to simulate a server here
//     setTimeout(() => {
//       // Only update the data if this is the latest fetch
//       if (fetchId === fetchIdRef.current) {
//         const startRow = pageSize * pageIndex
//         const endRow = startRow + pageSize
//         setData(serverData.slice(startRow, endRow))

//         // Your server could send back total page count.
//         // For now we'll just fake it, too
//         setPageCount(Math.ceil(serverData.length / pageSize))

//         setLoading(false)
//       }
//     }, 1000)
//   }, [])

//   return (
//     <Styles>
//       <Table
//         columns={columns}
//         data={data}
//         fetchData={fetchData}
//         loading={loading}
//         pageCount={pageCount}
//       />
//     </Styles>
//   )
// }

// export default NewTable




import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { CustomerService } from '../service/CustomerService';

export default function CustomStorageDoc(props) {
    console.log("Custom storage",props.data.specificTransaction)

    const [customers, setCustomers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const representatives = [
        { name: "Amy Elsner", image: 'amyelsner.png' },
        { name: "Anna Fali", image: 'annafali.png' },
        { name: "Asiya Javayant", image: 'asiyajavayant.png' },
        { name: "Bernardo Dominic", image: 'bernardodominic.png' },
        { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
        { name: "Ioni Bowcher", image: 'ionibowcher.png' },
        { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
        { name: "Onyama Limba", image: 'onyamalimba.png' },
        { name: "Stephen Shaw", image: 'stephenshaw.png' },
        { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];
    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];
    

    useEffect(() => {
        CustomerService.getCustomersMedium().then(data => setCustomers(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onCustomSaveState = (state) => {
        sessionStorage.setItem('dt-state-demo-custom', JSON.stringify(state));
    }

    const onCustomRestoreState = () => {
        return JSON.parse(sessionStorage.getItem('dt-state-demo-custom'));
    }

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.country.code} src="https://primereact.org/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} width="30" />
                <span className="vertical-align-middle ml-2">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={`https://primereact.org/images/avatar/${rowData.representative.image}`} width="32" style={{ verticalAlign: 'middle' }} />
                <span className="vertical-align-middle ml-2">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    const representativeFilterTemplate = (options) => {
        return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
    }

    const representativesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`https://primereact.org/images/avatar/${option.image}`} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="vertical-align-middle ml-2">{option.name}</span>
            </div>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const onGlobalFilterChange = (event) => {
        const value = event.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
    };

    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Global Search" />
            </span>
        );
    }

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={customers} paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                selection={selectedCustomer} onSelectionChange={e => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id" responsiveLayout="scroll"
                stateStorage="custom" customSaveState={onCustomSaveState} customRestoreState={onCustomRestoreState} emptyMessage="No customers found.">
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name"></Column>
                {/* <Column header="Country" body={countryBodyTemplate} sortable sortField="country.name" filter filterField="country.name" filterPlaceholder="Search by country"></Column> */}
                <Column header="Agent" body={representativeBodyTemplate} sortable sortField="representative.name" filter filterField="representative" showFilterMatchModes={false} filterElement={representativeFilterTemplate} filterMenuStyle={{ width: '14rem' }}></Column>
                <Column field="status" header="Status" body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} filterMenuStyle={{ width: '14rem' }}></Column>
            </DataTable>
        </div>
    );
}
                