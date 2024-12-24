
export const top5Html = () => {

    return `<div class="form-row">
                    <label style="margin: 10px;">Top 5:</label>
                    <label for="top5-yes">Yes</label>
                    <input type="radio" id="top5-yes" name="top5" value="true">
                    <label for="top5-no">No</label>
                    <input type="radio" id="top5-no" name="top5" value="false">
                </div>`
}

export const regionOrCountryHtml = () => {
    return `<div class="form-row">
                    <label style="margin: 10px;">Region or Country:</label>
                    <label for="country">Country</label>
                    <input type="radio" id="country" name="region_or_country" value="country">
                    <label for="region">Region</label>
                    <input type="radio" id="region" name="region_or_country" value="region">
                </div>`
}

export const inputSearchHtml = (typeSearch, descripton) => {
    return `<div class="form-row">
                    <label for="country-name">${typeSearch}:</label>
                    <input type="text" id="country-name" name="country_name" placeholder="Enter ${typeSearch}">
                    
                </div>
                <div class="form-row">${descripton}</div>`
}

export const limitHtml = () => {
    return `<div class="form-row">
                    <label for="limit">Limit:</label>
                    <input type="number" id="limit">
                </div>`
}

export const startAndEndDates = () => {
    return `
                <div class="form-row">
                 <label for="startDateInput">Select a start date:</label>
               <input type="date" id="startDateInput">
                </div>
                <div class="form-row">
                 <label for="endDateInput">Select an end date:</label>
                <input type="date" id="endDateInput">
                </div>`
}