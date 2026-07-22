export const INVENTORY_MANAGEMENT_AST = {
  version: "1.0.0",
  meta: {
    title: "Warehouse Inventory & SKU Monitor",
    description: "Real-time stock levels, reorder thresholds, and warehouse logistics.",
    theme: "dark-glass",
  },
  layout: {
    type: "dashboard",
    columns: 12,
    gap: 16,
  },
  nodes: [
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-aa1111111111",
      type: "alert",
      gridPosition: { x: 0, y: 0, w: 12, h: 2 },
      props: {
        title: "Low Stock Alert Notice",
        description: "3 SKUs are currently below safety reorder threshold.",
        config: { type: "warning" },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-aa2222222222",
      type: "stat-grid",
      gridPosition: { x: 0, y: 2, w: 12, h: 4 },
      props: {
        title: "Logistics Hub Overview",
        data: [
          { label: "Total SKUs", value: "14,820", change: "Synced" },
          { label: "Pending Shipments", value: "184", change: "+14 Today" },
          { label: "Warehouse Capacity", value: "84%", change: "High" },
          { label: "Fulfillment Rate", value: "99.4%", change: "+0.2%" },
        ],
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-aa3333333333",
      type: "data-table",
      gridPosition: { x: 0, y: 6, w: 12, h: 6 },
      props: {
        title: "Warehouse Stock Ledger",
        description: "Active SKU units and locations",
        data: [
          { SKU: "SKU-881", Item: "Industrial Sensor Hub", Bay: "A-12", Units: 1420, Status: "In Stock" },
          { SKU: "SKU-882", Item: "Fiber Optic Transceiver", Bay: "B-04", Units: 84, Status: "Low Stock" },
          { SKU: "SKU-883", Item: "Cat6a Cable Reel 500m", Bay: "C-19", Units: 410, Status: "In Stock" },
          { SKU: "SKU-884", Item: "Rack Mount Chassis 4U", Bay: "A-01", Units: 12, Status: "Critical" },
        ],
        config: { columns: ["SKU", "Item", "Bay", "Units", "Status"] },
      },
    },
  ],
};
