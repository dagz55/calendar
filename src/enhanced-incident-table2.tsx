import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

const incidents = [
  { id: "INC11271209", severity: "4 - Low", summary: "l170072 -EAS2938 - /usr/local/sysadmin/rhel_patch_8 Radia script Failed!", status: "In Progress", owner: "RECS Linux Support", assignee: "Chet Jeremy Burgos", created: "07-23 11:15", lastModified: "07-30-2024 11:15:55" },
  { id: "INC11200220", severity: "4 - Low", summary: "z250204 -EAS2938 - /usr/local/sysadmin/rhel_patch_8 Radia script Failed!", status: "In Progress", owner: "RECS Linux Support", assignee: "Christopher San Diego", created: "07-05 19:00", lastModified: "07-12-2024 19:00:55" },
  { id: "INC11263096", severity: "4 - Low", summary: "l299204 -EAS2938 - /usr/local/sysadmin/rhel_patch_8 Radia script Failed!", status: "In Progress", owner: "RECS Linux Support", assignee: "Christopher San Diego", created: "07-20 17:04", lastModified: "07-27-2024 17:04:55" },
  { id: "INC11212356", severity: "4 - Low", summary: "d292001 -EAS2938 - /usr/local/sysadmin/rhel_patch_8 Radia script Failed!", status: "In Progress", owner: "RECS Linux Support", assignee: "Christopher San Diego", created: "07-09 16:19", lastModified: "07-16-2024 16:19:55" },
  { id: "INC11175049", severity: "4 - Low", summary: "u250204 -EAS2938 - /usr/local/sysadmin/rhel_patch_8 Radia script Failed!", status: "In Progress", owner: "RECS Linux Support", assignee: "Cindy Flowers", created: "07-01 19:54", lastModified: "07-08-2024 19:54:55" },
  { id: "INC11270841", severity: "4 - Low", summary: "z179777 -EAS2938 - rhel_patch_8.2024.r03-0.sh Radia script Failed!", status: "In Progress", owner: "RECS Linux Support", assignee: "George Pedraza", created: "07-23 07:29", lastModified: "07-30-2024 07:29:55" },
  { id: "INC11275608", severity: "4 - Low", summary: "VM is running out of memory (< 25% left) VALUE = 24%, esax-radia-prod-app-vm-pgm011507", status: "In Progress", owner: "RECS Linux Support", assignee: "Glenn Remot", created: "07-24 13:55", lastModified: "07-31-2024 13:55:53" },
  { id: "INC11262677", severity: "4 - Low", summary: "Server inaccessible via normal login or jumpbox", status: "In Progress", owner: "RECS Linux Support", assignee: "Glenn Remot", created: "07-20 10:31", lastModified: "07-27-2024 10:31:19" },
  { id: "INC11251209", severity: "4 - Low", summary: "FS is > 75%. Current Utilization is VALUE = 78, mountpoint /var/lib/rancher in lacy-cysiv-prod-app-vm-pgm011388", status: "In Progress", owner: "RECS Linux Support", assignee: "Greggy Ramos", created: "07-18 00:05", lastModified: "07-25-2024 00:05:26" },
  { id: "INC11199663", severity: "4 - Low", summary: "Data Partition not accessible Input/Ouput Error", status: "In Progress", owner: "RECS Linux Support", assignee: "Greggy Ramos", created: "07-05 10:51", lastModified: "07-12-2024 10:51:52" },
  { id: "INC11254290", severity: "4 - Low", summary: "Facing issue in login to the QA (QGM0112F4) server", status: "In Progress", owner: "RECS Linux Support", assignee: "Greggy Ramos", created: "07-18 17:59", lastModified: "07-25-2024 17:59:26" },
  { id: "INC11207625", severity: "4 - Low", summary: "dcfgqa02 - EAS3248 - syscheck HPCA not running!", status: "In Progress", owner: "RECS Linux Support", assignee: "Greggy Ramos", created: "07-08 11:37", lastModified: "07-15-2024 11:37:55" },
  { id: "INC11274187", severity: "3 - Medium", summary: "Linux VM are in stopped state", status: "In Progress", owner: "RECS Linux Support", assignee: "Greggy Ramos", created: "07-24 02:44", lastModified: "07-26-2024 02:44:25" },
];

const IncidentTable = () => {
  const [sortedIncidents, setSortedIncidents] = useState(incidents);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filteredIncidents = incidents.filter(incident =>
      Object.values(incident).some(value =>
        value.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );

    let sortedItems = [...filteredIncidents];
    if (sortConfig.key !== null) {
      sortedItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedIncidents(sortedItems);
  }, [filterValue, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
    }
    return <ChevronsUpDown className="w-4 h-4" />;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedIncidents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <Input
        type="text"
        placeholder="Filter incidents..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(incidents[0]).map((key) => (
              <TableHead key={key} onClick={() => requestSort(key)} className="cursor-pointer">
                <div className="flex items-center">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {getSortIcon(key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((incident) => (
            <TableRow key={incident.id}>
              {Object.values(incident).map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedIncidents.length)} of {sortedIncidents.length} entries
        </div>
        <div>
          {Array.from({ length: Math.ceil(sortedIncidents.length / itemsPerPage) }, (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 ${currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-200'}`}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentTable;