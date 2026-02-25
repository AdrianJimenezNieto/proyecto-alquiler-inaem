'use strict';

// Cars info
const cars = [
    {
        id: 1,
        type: "Turismo",
        basePrice: 35,
        kmPrice: 0.02,
        insurance: {
            A: 6,
            B: 10
        }
    },
    {
        id: 2,
        type: "Monovolumen",
        basePrice: 40,
        kmPrice: 0.03,
        insurance: {
            A: 9,
            B: 14
        }
    },
    {
        id: 3,
        type: "Furgoneta",
        basePrice: 45,
        kmPrice: 0.05,
        insurance: {
            A: 12,
            B: 18
        }
    },
    {
        id: 4,
        type: "Turismo Deportivo",
        basePrice: 50,
        kmPrice: 0.08,
        insurance: {
            A: 15,
            B: 22
        }
    },
];

// #############################################################################
// ################################ HELPERS ####################################
// #############################################################################

const createDOMElement = ({
    tag = 'div',
    classes = [],
    content = '',
    ...atributes
}) => {
    const element = document.createElement(tag);
    
    if (classes.length) element.classList.add(...classes);
    
    if (content) element.textContent = content;
    
    Object.entries(atributes).forEach(([key, value]) => {
        if (value === true) element.setAttribute(key, '');
        else element.setAttribute(key, value);
    });
    
    return element;
};



// #############################################################################
// ################################ LOGIC ######################################
// #############################################################################

// Función para validas los input

document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const tableContainer = document.getElementById("info-table-wrapper");
    const formContainer = document.getElementById("form-wrapper");
    const outputContainer = document.getElementById("billing-wrapper");

    // #############################################################################
    // ################################ TABLE RENDER ###############################
    // #############################################################################
    const tableHeadersNames = ['Tipo', 'Base', 'Km', 'Seguro A', 'Seguro B'];

    const tableHTML =
        `<table>
        <thead>
            ${tableHeadersNames.map(header => `<th>${header}</th>`).join('')}
        </thead>
        <tbody>
            ${cars.map(car => `
                <tr>
                    <td>
                        ${car.type}
                    </td>
                    <td>
                        ${car.basePrice} €
                    </td>
                    <td>
                        ${car.kmPrice} €
                    </td>
                    <td>
                        ${car.insurance.A} €
                    </td>
                    <td>
                        ${car.insurance.B} €
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>`;

    tableContainer.innerHTML = tableHTML;

    // #############################################################################
    // ################################ FROM RENDER ################################
    // #############################################################################

    const formHTML = `
    <form id="form">
        <div class="form-grp">
            <label for="inpt-car-type">Coche a alquilar: </label>
            <select id="inpt-car-type">
                <option selected disabled>Seleccione un coche</option>
                ${cars.map(car => `
                    <option value="${car.id}">${car.id} - ${car.type}</option>
                `).join("")}
            </select>
        </div>
        <div class="form-grp">
            <div class="inpt-grp">
                <label for="inpt-ini-km">Km. Iniciales</label>
                <input type="number" placeholder="" id="inpt-ini-km">
            </div>
            <span> - </span>
            <div class="inpt-grp">
                <label for="inpt-end-km">Km. Finales</label>
                <input type="number" placeholder="" id="inpt-end-km">
            </div>
        </div>
        <div class="form-grp">
            <div class="inpt-grp">
                <label for="inpt-ini-date">Día de Inicio</label>
                <input type="date" placeholder="" id="inpt-ini-date">
            </div>
            <span> - </span>
            <div class="inpt-grp">
                <label for="inpt-end-date">Día de Devolución</label>
                <input type="date" placeholder="" id="inpt-end-date">
            </div>
        </div>
        <div class="form-grp">
            <label for="inpt-insurance">Tipo de seguro:</label>
            <select id="inpt-insurance">
                <option selected disabled>Seleccione un Seguro</option>
                <option value="A">Seguro A</option>
                <option value="B">Seguro B</option>
            </select>
        </div>
        <div class="form-grp">
            <label for="inpt-vip-card">Tarjeta Cliente</label>
            <input type="checkbox" id="inpt-vip-card" >
        </div>
        <div class="btn-grp">
            <button type="submit">Calcular Factura</button>
        </div>
    </form>
    `;

    formContainer.innerHTML = formHTML;

    // #############################################################################
    // ############################## OUTPUT RENDER ################################
    // #############################################################################
    
    const outputHTML = `
    <article class="billing-card">
        <div class="billing-row">
            <p>Precio Base:</p>
            <input readonly id="base-price" class="readonly-input" />
        </div>
    </article>

    <article class="billing-card">
        <h3>Importe por Km.</h3>
        <div class="billing-row">
            <p>Total Km.:</p>
            <input readonly id="km-amount" class="readonly-input" />
        </div>
        <div class="billing-row">
            <p>Precio por Km.:</p>
            <input readonly id="km-price" class="readonly-input" />
        </div>
        <div class="billing-row highlight-row">
            <p>Importe:</p>
            <input readonly id="km-total" class="readonly-input" />
        </div>
    </article>

    <article class="billing-card">
        <h3>Importe Seguro</h3>
        <div class="billing-row">
            <p>Total días:</p>
            <input readonly id="days-amount" class="readonly-input" />
        </div>
        <div class="billing-row">
            <p>Precio Seguro:</p>
            <input readonly id="insurance-price" class="readonly-input" />
        </div>
        <div class="billing-row highlight-row">
            <p>Importe total:</p>
            <input readonly id="insurance-total" class="readonly-input" />
        </div>
    </article>

    <article class="billing-card">
        <div class="billing-row">
            <p>Subtotal:</p>
            <input readonly id="subtotal" class="readonly-input" />
        </div>
        <div class="billing-row">
            <p>Dto (<input readonly id="discount" class="readonly-input inline-readonly" />):</p>
            <input readonly id="discount-amount" class="readonly-input" />
        </div>
        <div class="billing-row">
            <p>Base imponible:</p>
            <input readonly id="base-imponible" class="readonly-input" />
        </div>
        <div class="billing-row">
            <p>21% I.V.A.:</p>
            <input readonly id="taxes" class="readonly-input" />
        </div>
    </article>

    <article class="billing-card total-card">
        <div class="billing-row">
            <h2>A PAGAR:</h2>
            <input readonly id="total-amount" class="readonly-input total-highlight" />
        </div>
    </article>
    `;

    outputContainer.innerHTML = outputHTML;

    // #############################################################################
    // ####################### CACHEO INPUTS DE SALIDA #############################
    // #############################################################################
    const outBasePrice = document.getElementById("base-price");
    const outKmAmount = document.getElementById("km-amount");
    const outKmPrice = document.getElementById("km-price");
    const outKmTotal = document.getElementById("km-total");
    const outDaysAmount = document.getElementById("days-amount");
    const outInsurancePrice = document.getElementById("insurance-price");
    const outInsuranceTotal = document.getElementById("insurance-total");
    const outSubtotal = document.getElementById("subtotal");
    const outDiscountRate = document.getElementById("discount");
    const outDiscountAmount = document.getElementById("discount-amount");
    const outBaseImponible = document.getElementById("base-imponible");
    const outTaxes = document.getElementById("taxes");
    const outTotalAmount = document.getElementById("total-amount");

    // #############################################################################
    // ####################### LISTENER DEL FORMULARIO #############################
    // #############################################################################
    
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = {
            carType: document.getElementById("inpt-car-type"),
            iniKm: document.getElementById("inpt-ini-km"),
            endKm: document.getElementById("inpt-end-km"),
            iniDate: document.getElementById("inpt-ini-date"),
            endDate: document.getElementById("inpt-end-date"),
            insuranceType: document.getElementById("inpt-insurance")
        };

        const data = {
            carType: inputs.carType.value,
            iniKm: inputs.iniKm.value,
            endKm: inputs.endKm.value,
            iniDate: inputs.iniDate.value,
            endDate: inputs.endDate.value,
            insuranceType: inputs.insuranceType.value,
            vipCard: document.getElementById("inpt-vip-card").checked
        };

        // Limpiamos errores anteriores
        Object.values(inputs).forEach(input => {
            input.classList.remove("ipnut-error");
            // Quitamos el span
            const existingError = input.parentElement.querySelector(".error-msg-text");
            if (existingError) existingError.remove();
        })

        // Validamos
        const validation = validateData(data);

        // Comprobamos si hay errores
        if (!validation.isValid) {
            // Recorremos el objeto de errores y ponemos la caja roja a los malos
            Object.entries(validation.errors).forEach(([key, message]) => {
                if (inputs[key]) {
                    // Input en rojo
                    inputs[key].classList.add("input-error");

                    // Añadimos span con la info
                    const errorSpan = document.createElement("span");
                    errorSpan.className = "error-msg-text";
                    errorSpan.textContent = message;

                    // Lo metemos en el div del input
                    inputs[key].parentElement.appendChild(errorSpan);
                }
            });
            
            return; // Cortamos la ejecución del evento
        }

        // Lógica de cálculo
        const car = cars.find(c => c.id === Number(data.carType));

        const basePrice = car.basePrice;
        const totalKm = Math.max(0, Number(data.endKm) - Number(data.iniKm));
        const pricePerKm = car.kmPrice;
        const totalKmPrice = totalKm * pricePerKm;

        const diffTime = new Date(data.endDate).getTime() - new Date(data.iniDate).getTime();
        const nOfDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

        const insurancePrice = car.insurance[data.insuranceType];
        const totalInsurance = insurancePrice * nOfDays;

        const subtotal = basePrice + totalKmPrice + totalInsurance;
        const discountRate = data.vipCard ? 0.2 : 0;
        const totalDiscount = subtotal * discountRate;
        const baseImponible = subtotal - totalDiscount;
        const taxes = baseImponible * 0.21;
        const finalPrice = baseImponible + taxes;

        // Inyectamos los valores en los inputs cacheados
        outBasePrice.value = `${basePrice.toFixed(2)} €`;
        outKmAmount.value = `${totalKm} Km`;
        outKmPrice.value = `${pricePerKm.toFixed(2)} €`;
        outKmTotal.value = `${totalKmPrice.toFixed(2)} €`;
        outDaysAmount.value = nOfDays;
        outInsurancePrice.value = `${insurancePrice.toFixed(2)} €`;
        outInsuranceTotal.value = `${totalInsurance.toFixed(2)} €`;
        outSubtotal.value = `${subtotal.toFixed(2)} €`;
        outDiscountRate.value = `${discountRate * 100}%`;
        outDiscountAmount.value = `${totalDiscount.toFixed(2)} €`;
        outBaseImponible.value = `${baseImponible.toFixed(2)} €`;
        outTaxes.value = `${taxes.toFixed(2)} €`;
        outTotalAmount.value = `${finalPrice.toFixed(2)} €`;
    });
});

// Función para validar los datos de entrada
const validateData = (data) => {
    const errors = {}; // Aquí guardaremos qué campos fallan

    // Validación de tipo de coche
    const carType = Number(data.carType);
    if (!carType || !cars.some((car) => car.id === carType)) {
        errors.carType = "Debes seleccionar un vehículo de la lista.";
    }

    // Validación de los Km
    const iniKm = Number(data.iniKm);
    const endKm = Number(data.endKm);
    if (data.iniKm === "" || isNaN(iniKm)) errors.iniKm = "Indica los Km.";
    if (data.endKm === "" || isNaN(endKm)) errors.endKm = "Indica los Km.";
    // Si ambos tienen números, pero el inicial es mayor o igual al final:
    if (!errors.iniKm && !errors.endKm && iniKm >= endKm) {
        errors.iniKm = "Debe ser menor a los finales.";
        errors.endKm = "Debe ser mayor a los iniciales.";
    }

    // Validación de fechas
    const iniDate = new Date(data.iniDate).getTime();
    const endDate = new Date(data.endDate).getTime();
    if (isNaN(iniDate)) errors.iniDate = "Indica la fecha";
    if (isNaN(endDate)) errors.endDate = "Indica la fecha";
    if (!errors.iniDate && !errors.endDate && iniDate > endDate) {
        errors.iniDate = "No puede ser posterior a la devolución.";
        errors.endDate = "No puede ser anterior al inicio.";
    }

    // Validación de tipo de seguro
    if (!data.insuranceType || !["A", "B"].includes(data.insuranceType)) {
        errors.insuranceType = "Selecciona un tipo de seguro.";
    }

    return {
        isValid: Object.keys(errors).length === 0, // Es válido si no hay ninguna key en errors
        errors: errors
    };
}