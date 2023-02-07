import React from "react";
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { CustomerService } from '../service/CustomerService';
import { useState } from "react";



export default function TheTable(props){

    const data=props.data.specificTransaction
    const [filters,setFilters]=useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }})
    console.log("hmmmm",data)


    return(
        <div className="TheTable">
    <InputText type="search"  onChange={(e) =>setFilters({global: { value :e.target.value, matchMode: FilterMatchMode.CONTAINS }}) } placeholder="Global Search" />
            
    <DataTable value={data} sortMode="multiple" filters={filters} paginator rows={5} >
    <Column field="id" header="ID" sortable></Column>
    <Column field="asset" header="ASSET" sortable></Column>
    <Column field="dateCreated" header="DateCreated" sortable></Column>
    <Column field="transactionType" header="Type" sortable></Column>


    </DataTable>
    </div>
    )



}