import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";

// Department
import Administration from "./pages/department/Administration";
import Minting from "./pages/department/Minting";
import Lab from "./pages/department/Lab";
import GoldRefinery from "./pages/department/GoldRefinery";
import SilverRefinery from "./pages/department/SilverRefinery";
import Melting from "./pages/department/Melting";
import Casting from "./pages/department/Casting";
import VaultDept from "./pages/department/VaultDept";
import CollectionCenter from "./pages/department/CollectionCenter";
import Kitchen from "./pages/department/Kitchen";

// HR
import EmployeeDetails from "./pages/hr/EmployeeDetails";
import Leave from "./pages/hr/Leave";
import Attendance from "./pages/hr/Attendance";
import HrPolicy from "./pages/hr/HrPolicy";
import SalarySlip from "./pages/hr/SalarySlip";

// Metal Accounting
import LabAccounting from "./pages/accounting/LabAccounting";
import ProductionAccounting from "./pages/accounting/ProductionAccounting";

// Standalone
import MetalProcessing from "./pages/processing/MetalProcessing";
import ElectricityConsumption from "./pages/electricity/ElectricityConsumption";
import MetalDispatch from "./pages/dispatch/MetalDispatch";

// Vault
import VaultProduction from "./pages/vault/VaultProduction";
import VaultLab from "./pages/vault/VaultLab";

// New top-level pages
import RefineryLayout from "./pages/layout/RefineryLayout";
import Consumables from "./pages/consumables/Consumables";
import CollectionCenterPage from "./pages/collection/CollectionCenter";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        {/* Department */}
        <Route path="department/administration" element={<Administration />} />
        <Route path="department/minting" element={<Minting />} />
        <Route path="department/lab" element={<Lab />} />
        <Route path="department/gold-refinery" element={<GoldRefinery />} />
        <Route path="department/silver-refinery" element={<SilverRefinery />} />
        <Route path="department/melting" element={<Melting />} />
        <Route path="department/casting" element={<Casting />} />
        <Route path="department/vault" element={<VaultDept />} />
        <Route path="department/collection-center" element={<CollectionCenter />} />
        <Route path="department/kitchen" element={<Kitchen />} />

        {/* Human Resource */}
        <Route path="hr/employees" element={<EmployeeDetails />} />
        <Route path="hr/leave" element={<Leave />} />
        <Route path="hr/attendance" element={<Attendance />} />
        <Route path="hr/policy" element={<HrPolicy />} />
        <Route path="hr/salary-slip" element={<SalarySlip />} />

        {/* Metal Accounting */}
        <Route path="metal-accounting/lab" element={<LabAccounting />} />
        <Route path="metal-accounting/production" element={<ProductionAccounting />} />

        {/* Standalone */}
        <Route path="metal-processing" element={<MetalProcessing />} />
        <Route path="electricity-consumption" element={<ElectricityConsumption />} />
        <Route path="metal-dispatch" element={<MetalDispatch />} />

        {/* Vault */}
        <Route path="vault/production" element={<VaultProduction />} />
        <Route path="vault/lab" element={<VaultLab />} />

        {/* New pages */}
        <Route path="refinery-layout" element={<RefineryLayout />} />
        <Route path="inventory" element={<Consumables />} />
        <Route path="collection-center" element={<CollectionCenterPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
