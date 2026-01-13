import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

import { useEffect, useState } from 'react';
import type { Artwork, ApiResponse } from '../types/artwork';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef } from 'react';

  

  const ArtTable = () => {
  const overlayRef = useRef<OverlayPanel>(null);
  const [selectCount, setSelectCount] = useState<number | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deselectedIds, setDeselectedIds] = useState<Set<number>>(new Set());
  const selectedRowsOnPage = artworks.filter(
    (art) => selectedIds.has(art.id) && !deselectedIds.has(art.id)
  );



  useEffect(() => {
  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${rows}&sort=id`
);


      const data: ApiResponse = await response.json();

      setArtworks(data.data);
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchArtworks();
 }, [page, rows]);


  if (loading) {
    return <p>Loading artworks...</p>;
  }

  return (
  <div>
    {/* Custom Select Button */}
    <div style={{ marginBottom: '1rem' }}>
      <Button
        label="Custom Select"
        icon="pi pi-check-square"
        onClick={(e) => overlayRef.current?.toggle(e)}
      />
    </div>
        {/* Overlay Panel UI */}
    <OverlayPanel ref={overlayRef}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <InputNumber
          value={selectCount}
         onValueChange={(e) => setSelectCount(e.value ?? null)}

          placeholder="Enter number of rows"
          min={1}
        />

        <Button
          label="Apply"
          onClick={() => {
             if (!selectCount || selectCount <= 0) return;

              if (selectCount > artworks.length) {
               alert(`Only ${artworks.length} rows available on this page`);
              return;
            }

            const idsToSelect = artworks
              .slice(0, selectCount)
              .map(a => a.id);

            setSelectedIds(prev => {
              const next = new Set(prev);
              idsToSelect.forEach(id => next.add(id));
              return next;
            });

            setDeselectedIds(prev => {
              const next = new Set(prev);
              idsToSelect.forEach(id => next.delete(id));
              return next;
            });

            overlayRef.current?.hide();
            setSelectCount(null);
          }}
        />
      </div>
    </OverlayPanel>
<div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
  Selected: {selectedRowsOnPage.length} rows
</div>

 <DataTable
  value={artworks}
  loading={loading}
  lazy
  paginator
  first={first}
  rows={rows}
  totalRecords={totalRecords}
  dataKey="id"
  selection={selectedRowsOnPage}
  selectionMode="multiple"
  onSelectionChange={(e) => {
  if (!Array.isArray(e.value)) return;

  const currentPageIds = new Set(artworks.map(a => a.id));
  const newSelectedIds = new Set(e.value.map(a => a.id));

  setSelectedIds(prev => {
    const next = new Set(prev);
    newSelectedIds.forEach(id => next.add(id));
    return next;
  });

  setDeselectedIds(prev => {
    const next = new Set(prev);
    currentPageIds.forEach(id => {
      if (!newSelectedIds.has(id) && selectedIds.has(id)) {
        next.add(id);
      }
    });
    return next;
  });
}}

  onPage={(e) => {
    setFirst(e.first ?? 0);
    setRows(e.rows);
    if (typeof e.page === 'number') {
      setPage(e.page + 1);
    }
  }}
  responsiveLayout="scroll"
>



  emptyMessage="No artworks found"

  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
  <Column field="title" header="Title" />
  <Column field="place_of_origin" header="Place of Origin" />
  <Column field="artist_display" header="Artist" />
  <Column
  field="inscriptions"
  header="Inscriptions"
  body={(rowData) => rowData.inscriptions?.trim() || 'N/A'}
/>
  <Column field="date_start" header="Date Start" />
  <Column field="date_end" header="Date End" />
</DataTable>

  </div>
  );


};

export default ArtTable;
