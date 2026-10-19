/**
 * WMS STORE - LÍNEA HÚMEDA PARA MAQUINARIA PESADA
 * Gestión de inventario con seriales, trazabilidad de despachos (Johan / Santiago)
 * y catálogo con proveedores.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.WMSStore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const STORAGE_KEYS = {
    PRODUCTS: 'wms_linea_humeda_products_v1',
    SERIALS: 'wms_linea_humeda_serials_v1',
    DISPATCHES: 'wms_linea_humeda_dispatches_v1',
    SEQ: 'wms_linea_humeda_seq_v1'
  };

  // 79 referencias oficiales de Línea Húmeda
  const RAW_REFERENCES = [
    { ref: 'BOMBA"ENG-C102-25-LAS-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"ENG-G102-20-LAS-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Commercial Intertech' },
    { ref: 'BOMBA"ENG-C102-25-RAS-ISO-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"ENG-C102-25-RAS-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"PALE-2520VQ-21A-14-11-CC-20-ET', type: 'Bomba Hidráulica (Paletas)', supplier: 'Vickers / Eaton' },
    { ref: 'BOMBA"ENG-C102-25-LAS-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Permco' },
    { ref: 'BOMBA"ENG-DP.35/90-DD-UNI-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"ENG-P50-313-9610-425-SAE-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Permco' },
    { ref: 'BOMBA"ENG-DP.35/90-DD-ISO-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"ENG-DP.35/32-DD-UNI-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"ENG-DP.40/107-DD-UNI-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"PIST-EP.20-05-065-L-GRN', type: 'Bomba Hidráulica (Pistones)', supplier: 'Sunfab / Rexroth' },
    { ref: 'BOMBA"ENG-DP.35/32-DD-ISO-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"ENG-G101-20-LMS-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Commercial Intertech' },
    { ref: 'BOMBA"ENG-C101-25-LAS-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"ENG-DP.35/63-DD-ISO-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"ENG-DP.35/82-DD-UNI-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"ENG-C101-25-LMS-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Permco' },
    { ref: 'BOMBA"ENG-C102-25-LMS-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Permco' },
    { ref: 'BOMBA"ENG-DP.35/40-DD-UNI-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"ENG-P350-323-9110-515-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Permco' },
    { ref: 'BOMBA"ENG-G101-20-LAS-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"PALE-2520VQ-17A-11-11-CC-20-ET', type: 'Bomba Hidráulica (Paletas)', supplier: 'Vickers / Eaton' },
    { ref: 'BOMBA"ENG-C102-25-RMS-ISO-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"ENG-C102-25-LMS-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"ENG-C101-25-LMS-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"ENG-DP.37/107-DD-ISO-CL', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Chelsea / Parker' },
    { ref: 'BOMBA"ENG-P20-308-9110-266-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Permco' },
    { ref: 'BOMBA"ENG-G101-20-LAS-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Commercial Intertech' },
    { ref: 'BOMBA"ENG-G102-20-LMS-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Commercial Intertech' },
    { ref: 'BOMBA"ENG-G102-20-LAS-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'HYVA / Parker' },
    { ref: 'BOMBA"PIST-EP.17-05-045-L-TRC', type: 'Bomba Hidráulica (Pistones)', supplier: 'Rexroth Bosch' },
    { ref: 'BOMBA"ENG-P350-323-9110-263-HM', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Permco' },
    { ref: 'BOMBA"ENG-DP.35/63-DD-UNI-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'BOMBA"ENG-DP.35/40-DD-ISO-ET', type: 'Bomba Hidráulica (Engranajes)', supplier: 'Aber Hydraulic' },
    { ref: 'PTO-ZF-01-ISO-TER', type: 'Toma de Fuerza (PTO)', supplier: 'Bezares / ZF' },
    { ref: 'PTO-442XUJWX-V5XK-26/20-SAE-B-CHELSEA-CL', type: 'Toma de Fuerza (PTO)', supplier: 'Chelsea / Parker' },
    { ref: 'PTO-JAC-LC6T540-NEU-UNI-ST-1.11-300-GRN', type: 'Toma de Fuerza (PTO)', supplier: 'JAC Heavy Trucks' },
    { ref: 'PTO-ZF-5S408/368-ISO-NEUMATICO-TER', type: 'Toma de Fuerza (PTO)', supplier: 'ZF Friedrichshafen' },
    { ref: 'PTO-WLY6TS55C-NEU-UNI-ST-1.147-350-GRN', type: 'Toma de Fuerza (PTO)', supplier: 'WLY Transmissions' },
    { ref: 'PTO-FULLER-STD-RL.1/1-ISO-TER', type: 'Toma de Fuerza (PTO)', supplier: 'Eaton Fuller' },
    { ref: 'PTO-VOL-VT-2214/SR1700-TER', type: 'Toma de Fuerza (PTO)', supplier: 'Volvo Trucks' },
    { ref: 'PTO-MBZ-G85-RLDO-ISO-TER', type: 'Toma de Fuerza (PTO)', supplier: 'Mercedes-Benz' },
    { ref: 'PTO-AKT.ISZ.27.ISO-HYP', type: 'Toma de Fuerza (PTO)', supplier: 'Isuzu / Aisin' },
    { ref: 'PTO-ZF-03-ISO-NEUMATICO-TER', type: 'Toma de Fuerza (PTO)', supplier: 'ZF Friedrichshafen' },
    { ref: 'PTO-ZF-6S500/600-ISO-TER', type: 'Toma de Fuerza (PTO)', supplier: 'ZF Friedrichshafen' },
    { ref: 'PTO-AKT.ISZ.16.ISO-HYP', type: 'Toma de Fuerza (PTO)', supplier: 'Isuzu / Aisin' },
    { ref: 'PTO-JAC-8JS75TC -D-NEU-CAR-ST-0-0-HBI', type: 'Toma de Fuerza (PTO)', supplier: 'Fast Gear / JAC' },
    { ref: 'PTO-F8JZ-95CM-FAST-GEAR-HBI', type: 'Toma de Fuerza (PTO)', supplier: 'Fast Gear' },
    { ref: 'PTO-MBZ-G211/240/280/181-ISO-RLDO-TER', type: 'Toma de Fuerza (PTO)', supplier: 'Mercedes-Benz' },
    { ref: 'PTO-EAT-ES11109-LATERAL-PIÑON-REVERSA-SAE-TER', type: 'Toma de Fuerza (PTO)', supplier: 'Eaton Fuller' },
    { ref: 'PTO-EAT-ESO-6106/6206A-LATERAL-ISO-TER', type: 'Toma de Fuerza (PTO)', supplier: 'Eaton Fuller' },
    { ref: 'PTO-AKT.ISZ.16.UNI-HBI', type: 'Toma de Fuerza (PTO)', supplier: 'Isuzu / Aisin' },
    { ref: 'PTO-AKT.ISZ.17.ISO-HBI', type: 'Toma de Fuerza (PTO)', supplier: 'Isuzu / Aisin' },
    { ref: 'PTO-589XLAHX-V3XK-25/24-FULLER-HM', type: 'Toma de Fuerza (PTO)', supplier: 'Chelsea / Eaton' },
    { ref: 'PTO-AKT.ISZ.20.ISO-HYP', type: 'Toma de Fuerza (PTO)', supplier: 'Isuzu / Aisin' },
    { ref: 'PTO-EAT-ES11109-TRASERO-SAE-TER', type: 'Toma de Fuerza (PTO)', supplier: 'Eaton Fuller' },
    { ref: 'PTO-589XQAHX-V3XK-C-19/24-FULLER-HM', type: 'Toma de Fuerza (PTO)', supplier: 'Chelsea / Eaton' },
    { ref: 'CIL"TE-63-120-S63-5254-120-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-85-220-S85-5254-220-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-73-120-S73-66-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-95-235-S95-5254-235-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-53-106-S53-106-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-73-124-S73-5254-125-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-63-92-S63-101-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-74-135-S74-74-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-85-235-S85-5254-235-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-53-84-S53-66-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'CIL"TE-74-156-S74-74-ROSCA-SHD', type: 'Cilindro Telescópico Volco', supplier: 'Hyva / Binotto' },
    { ref: 'VAL-YDV.02-HYP', type: 'Válvula Neumática / Direccional', supplier: 'Hydrocar / Bezares' },
    { ref: 'VAL-YDV.10-CL', type: 'Válvula Neumática / Direccional', supplier: 'Chelsea / Parker' },
    { ref: 'KIT-SISTEMA-HIDRAULICO-PUMP-PTO-VAL-EPT', type: 'Kit Completo Línea Húmeda', supplier: 'Equipamiento Pesado SAS' },
    { ref: 'VAL-SDV-70-HMRV-HM', type: 'Válvula Reguladora de Presión', supplier: 'Muncie Power' },
    { ref: 'DWIN-15000-LBR-VAL-H-12mmX26m-WINCHE-JRT', type: 'Winche Hidráulico (15,000 lbs)', supplier: 'Runva / Warn' },
    { ref: 'VAL-SDV-PPRVS-1700-HM', type: 'Válvula Neumática Volco', supplier: 'Bezares' },
    { ref: 'PLATO VALVULA-REXROTH-AA4VG125HWD-CL', type: 'Repuesto Hidráulico Maquinaria', supplier: 'Rexroth Bosch' },
    { ref: 'DWIN-20000-LBR-VAL-H-14mmX48m-WINCHE-JRT', type: 'Winche Hidráulico (20,000 lbs)', supplier: 'Runva / Warn' },
    { ref: 'DWIN-10000-LBR-VAL-H-10mmX25m-WINCHE-JRT', type: 'Winche Hidráulico (10,000 lbs)', supplier: 'Runva / Warn' },
    { ref: 'VAL-SDV-PPRVS-2250-HM', type: 'Válvula Neumática Volco', supplier: 'Bezares' }
  ];

  function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(RAW_REFERENCES));
    }

    if (!localStorage.getItem(STORAGE_KEYS.SERIALS)) {
      // Generar seriales iniciales en bodega para cada referencia
      const serials = [];
      // Incluir el serial del mockup
      serials.push({
        serial: "M1CS'RSK'50 020206",
        ref: 'KIT-SISTEMA-HIDRAULICO-PUMP-PTO-VAL-EPT',
        type: 'Kit Completo Línea Húmeda',
        status: 'Disponible',
        location: 'Bodega Principal - Bahía 01'
      });

      RAW_REFERENCES.forEach((prod, idx) => {
        const prefix = prod.ref.split('-')[0].replace('"', '');
        const serial1 = `${prefix}-${(idx + 10).toString().padStart(3, '0')}-0202${idx}`;
        const serial2 = `${prefix}-${(idx + 50).toString().padStart(3, '0')}-0305${idx}`;
        serials.push({
          serial: serial1,
          ref: prod.ref,
          type: prod.type,
          status: 'Disponible',
          location: 'Estantería Hidráulica A-' + ((idx % 5) + 1)
        });
        serials.push({
          serial: serial2,
          ref: prod.ref,
          type: prod.type,
          status: 'Disponible',
          location: 'Estantería Hidráulica B-' + ((idx % 4) + 1)
        });
      });
      localStorage.setItem(STORAGE_KEYS.SERIALS, JSON.stringify(serials));
    }

    if (!localStorage.getItem(STORAGE_KEYS.DISPATCHES)) {
      // Salidas preexistentes para consolidado
      const initialDispatches = [
        {
          id: 'DSP-001',
          date: '18/10/2026 04:15 p. m.',
          docPrefix: 'REM',
          docNumber: '8869',
          document: 'REM-8869',
          ref: 'BOMBA"ENG-C102-25-LAS-ET',
          serial: 'BOMBAENG-012-020202',
          type: 'Bomba Hidráulica (Engranajes)',
          technician: 'JOHAN',
          timestamp: Date.now() - 14400000
        },
        {
          id: 'DSP-002',
          date: '18/10/2026 05:40 p. m.',
          docPrefix: 'REM',
          docNumber: '8870',
          document: 'REM-8870',
          ref: 'PTO-ZF-01-ISO-TER',
          serial: 'PTO-045-020235',
          type: 'Toma de Fuerza (PTO)',
          technician: 'SANTIAGO',
          timestamp: Date.now() - 7200000
        }
      ];
      localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(initialDispatches));
    }

    if (!localStorage.getItem(STORAGE_KEYS.SEQ)) {
      localStorage.setItem(STORAGE_KEYS.SEQ, '8871');
    }
  }

  initStorage();

  return {
    getProducts: function () {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
      } catch (e) {
        return RAW_REFERENCES;
      }
    },

    addProduct: function (ref, type, supplier, initialSerial) {
      const prods = this.getProducts();
      const existing = prods.find(p => p.ref.toLowerCase() === ref.trim().toLowerCase());
      if (existing) {
        existing.supplier = supplier || existing.supplier;
        existing.type = type || existing.type;
      } else {
        prods.unshift({
          ref: ref.trim(),
          type: type || 'Línea Húmeda General',
          supplier: supplier || 'Sin Proveedor Asignado'
        });
      }
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));

      if (initialSerial && initialSerial.trim()) {
        const serials = this.getSerials();
        serials.unshift({
          serial: initialSerial.trim(),
          ref: ref.trim(),
          type: type || 'Línea Húmeda General',
          status: 'Disponible',
          location: 'Bodega Principal'
        });
        localStorage.setItem(STORAGE_KEYS.SERIALS, JSON.stringify(serials));
      }
      return true;
    },

    getSerials: function () {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERIALS) || '[]');
      } catch (e) {
        return [];
      }
    },

    getAvailableSerials: function () {
      return this.getSerials().filter(s => s.status === 'Disponible');
    },

    findSerial: function (query) {
      if (!query) return null;
      const clean = query.trim().toLowerCase();
      const list = this.getSerials();
      return list.find(s => s.serial.toLowerCase() === clean);
    },

    getNextDocNumber: function () {
      const seq = parseInt(localStorage.getItem(STORAGE_KEYS.SEQ) || '8871', 10);
      return seq.toString();
    },

    registerDispatch: function (dispatchData) {
      const dispatches = this.getDispatches();
      const serials = this.getSerials();
      const doc = `${dispatchData.docPrefix}-${dispatchData.docNumber}`;
      const nowFormatted = dispatchData.date || new Date().toLocaleString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      });

      dispatchData.items.forEach((item, index) => {
        const record = {
          id: 'DSP-' + Date.now() + '-' + index,
          date: nowFormatted,
          docPrefix: dispatchData.docPrefix,
          docNumber: dispatchData.docNumber,
          document: doc,
          ref: item.ref,
          serial: item.serial,
          type: item.type,
          technician: (dispatchData.technician || 'SANTIAGO').toUpperCase(),
          timestamp: Date.now()
        };
        dispatches.unshift(record);

        // Actualizar estado del serial a Despachado
        const serObj = serials.find(s => s.serial.toLowerCase() === item.serial.trim().toLowerCase());
        if (serObj) {
          serObj.status = 'Despachado';
          serObj.lastDoc = doc;
          serObj.dispatchedBy = dispatchData.technician;
          serObj.dispatchDate = nowFormatted;
        } else {
          serials.push({
            serial: item.serial.trim(),
            ref: item.ref,
            type: item.type,
            status: 'Despachado',
            lastDoc: doc,
            dispatchedBy: dispatchData.technician,
            dispatchDate: nowFormatted
          });
        }
      });

      localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(dispatches));
      localStorage.setItem(STORAGE_KEYS.SERIALS, JSON.stringify(serials));

      // Incrementar consecutivo
      const nextNum = parseInt(dispatchData.docNumber, 10) + 1;
      localStorage.setItem(STORAGE_KEYS.SEQ, isNaN(nextNum) ? '8872' : nextNum.toString());

      return true;
    },

    getDispatches: function () {
      try {
        const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.DISPATCHES) || '[]');
        let updated = false;
        list.forEach((item, idx) => {
          if (!item.id) {
            item.id = 'DSP-' + idx + '-' + (item.timestamp || (Date.now() - idx * 1000));
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(list));
        }
        return list;
      } catch (e) {
        return [];
      }
    },

    deleteDispatch: function (id) {
      if (!id) return false;
      const cleanId = id.toString().trim();
      let dispatches = this.getDispatches();
      const targetIndex = dispatches.findIndex((d, idx) => (d.id && d.id.toString() === cleanId) || (d.serial && d.serial.toString() === cleanId) || idx.toString() === cleanId);
      if (targetIndex === -1) return false;
      const target = dispatches[targetIndex];

      // Restaurar serial a Disponible si estaba registrado en bodega
      const serials = this.getSerials();
      const serObj = serials.find(s => s.serial && s.serial.toLowerCase() === (target.serial || '').toLowerCase());
      if (serObj) {
        serObj.status = 'Disponible';
        delete serObj.lastDoc;
        delete serObj.dispatchedBy;
        delete serObj.dispatchDate;
        localStorage.setItem(STORAGE_KEYS.SERIALS, JSON.stringify(serials));
      }

      dispatches.splice(targetIndex, 1);
      localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(dispatches));
      return true;
    },

    clearAllDispatches: function () {
      const dispatches = this.getDispatches();
      const serials = this.getSerials();

      // Restaurar seriales a Disponible
      dispatches.forEach(d => {
        if (!d.serial) return;
        const serObj = serials.find(s => s.serial && s.serial.toLowerCase() === d.serial.toLowerCase());
        if (serObj) {
          serObj.status = 'Disponible';
          delete serObj.lastDoc;
          delete serObj.dispatchedBy;
          delete serObj.dispatchDate;
        }
      });

      localStorage.setItem(STORAGE_KEYS.SERIALS, JSON.stringify(serials));
      localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify([]));
      return true;
    },

    importExcelData: function (rows) {
      if (!Array.isArray(rows)) return { totalProducts: 0, importedSerials: 0 };
      const prods = this.getProducts();
      const serials = this.getSerials();
      let importedCount = 0;

      rows.forEach((row) => {
        // Normalizar nombres de columnas
        const keys = Object.keys(row);
        let ref = '';
        let qty = 1;
        let serial = '';
        let supplier = 'Sin Asignar';
        let type = 'Línea Húmeda';

        keys.forEach(k => {
          const lk = k.toLowerCase().trim();
          const val = row[k] ? row[k].toString().trim() : '';
          if (lk.includes('ref') || lk.includes('cod') || lk === 'item' || lk === 'producto') ref = val;
          else if (lk.includes('exist') || lk.includes('cant') || lk.includes('stock')) {
            const parsed = parseInt(val, 10);
            if (!isNaN(parsed) && parsed > 0) qty = parsed;
          }
          else if (lk.includes('seri') || lk.includes('sn')) serial = val;
          else if (lk.includes('prov') || lk.includes('marca')) supplier = val;
          else if (lk.includes('tipo') || lk.includes('fam') || lk.includes('cat')) type = val;
        });

        if (!ref) return;

        // Clasificar tipo si es genérico
        if (type === 'Línea Húmeda') {
          const rUp = ref.toUpperCase();
          if (rUp.includes('BOMBA')) type = 'Bomba Hidráulica';
          else if (rUp.includes('PTO')) type = 'Toma de Fuerza (PTO)';
          else if (rUp.includes('CIL')) type = 'Cilindro Telescópico';
          else if (rUp.includes('VAL')) type = 'Válvula Neumática';
          else if (rUp.includes('WINCHE') || rUp.includes('DWIN')) type = 'Winche Hidráulico';
        }

        // 1. Agregar o actualizar en catálogo
        const existingProd = prods.find(p => p.ref.toLowerCase() === ref.toLowerCase());
        if (existingProd) {
          if (supplier && supplier !== 'Sin Asignar') existingProd.supplier = supplier;
          if (type && type !== 'Línea Húmeda') existingProd.type = type;
        } else {
          prods.push({ ref, type, supplier });
        }

        // 2. Si el Excel trae serial explícito
        if (serial) {
          const exists = serials.some(s => s.serial.toLowerCase() === serial.toLowerCase());
          if (!exists) {
            serials.unshift({
              serial: serial,
              ref: ref,
              type: type,
              status: 'Disponible',
              location: 'Bodega Principal'
            });
            importedCount++;
          }
        } else {
          // Si solo trae cantidad/existencias, generar seriales numéricos de bodega
          for (let i = 0; i < qty; i++) {
            const cleanRef = ref.replace(/[^A-Za-z0-9]/g, '').slice(0, 10);
            const genSerial = `${cleanRef}-${(serials.length + i + 1).toString().padStart(4, '0')}`;
            serials.unshift({
              serial: genSerial,
              ref: ref,
              type: type,
              status: 'Disponible',
              location: 'Bodega Principal'
            });
            importedCount++;
          }
        }
      });

      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
      localStorage.setItem(STORAGE_KEYS.SERIALS, JSON.stringify(serials));
      return { totalProducts: prods.length, importedSerials: importedCount };
    },

    getStats: function () {
      const serials = this.getSerials();
      const available = serials.filter(s => s.status === 'Disponible');
      const dispatches = this.getDispatches();

      const bombas = available.filter(s => s.type && s.type.includes('Bomba')).length;
      const ptos = available.filter(s => s.type && s.type.includes('Toma de Fuerza')).length;
      const cilindros = available.filter(s => s.type && s.type.includes('Cilindro')).length;
      const otros = available.length - (bombas + ptos + cilindros);

      const johanCount = dispatches.filter(d => d.technician === 'JOHAN').length;
      const santiagoCount = dispatches.filter(d => d.technician === 'SANTIAGO').length;

      return {
        totalStock: available.length,
        bombasCount: bombas,
        ptosCount: ptos,
        cilindrosCount: cilindros,
        otrosCount: otros,
        totalDispatched: dispatches.length,
        johanDispatches: johanCount,
        santiagoDispatches: santiagoCount
      };
    }
  };
});
