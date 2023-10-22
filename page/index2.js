const maxDays = 30;

console.log("endpoints", endpoints);

/**
 * endpoint 报告生成
 */
async function genReportLog(container, endpoint) {
    const statusStream = constructStatusStream(endpoint);

    // 最终的append 操作
    container.appendChild(statusStream);
}

/**
 * 单个 endpoint 模板 render
 */
function constructStatusStream({name, url, sla, reports}) {
    let streamContainer = applyTemplate("statusStreamContainerTemplate");
    for (let ii = 0; ii < reports.length; ii++) {
        // 每日状态 模板 render
        let line = constructStatusLine(name, reports[ii]);
        streamContainer.appendChild(line);
    }

    // report 信息及可用率汇总 模板 render
    const container = applyTemplate("statusContainerTemplate", {
        title: name,
        url: url,
        color: reports[0].status,
        status: getStatusText(reports[0].status),
        upTime: sla + "%",
    });

    container.appendChild(streamContainer);
    return container;
}

function constructStatusLine(name, {day, status, conditionResults, sla}) {
    const date = new Date(day);
    let square = applyTemplate("statusSquareTemplate", {
        color: status,
        tooltip: getTooltip(name, date, status),
    });

    const show = () => {
        showTooltip(square, name, date, status);
    };
    square.addEventListener("mouseover", show);
    square.addEventListener("mousedown", show);
    square.addEventListener("mouseout", hideTooltip);
    return square;
}


let cloneId = 0;

/**
 * 模板
 */
function applyTemplate(templateId, parameters) {
    let clone = document.getElementById(templateId).cloneNode(true);
    clone.id = "template_clone_" + cloneId++;
    if (!parameters) {
        return clone;
    }

    applyTemplateSubstitutions(clone, parameters);
    return clone;
}

function applyTemplateSubstitutions(node, parameters) {
    const attributes = node.getAttributeNames();
    for (let ii = 0; ii < attributes.length; ii++) {
        const attr = attributes[ii];
        const attrVal = node.getAttribute(attr);
        node.setAttribute(attr, applyTemplateString(attrVal, parameters));
    }

    if (node.childElementCount === 0) {
        node.innerText = applyTemplateString(node.innerText, parameters);
    } else {
        const children = Array.from(node.children);
        children.forEach((n) => {
            applyTemplateSubstitutions(n, parameters);
        });
    }
}

function applyTemplateString(text, parameters) {
    if (parameters) {
        for (const [key, val] of Object.entries(parameters)) {
            text = text.replaceAll("$" + key, val);
        }
    }
    return text;
}

/**
 * 状态文本
 */
function getStatusText(status) {
    return status === "nodata"
        ? "No Data Available"
        : status === "success"
            ? "Fully Operational"
            : status === "failure"
                ? "Major Outage"
                : status === "partial"
                    ? "Partial Outage"
                    : "Unknown";
}

/**
 * 状态详情
 */
function getStatusDescriptiveText(status) {
    return status === "nodata"
        ? "No Data Available: Health check was not performed."
        : status === "success"
            ? "No downtime recorded on this day."
            : status === "failure"
                ? "Major outages recorded on this day."
                : status === "partial"
                    ? "Partial outages recorded on this day."
                    : "Unknown";
}

function getTooltip(name, date, status) {
    let statusText = getStatusText(status);
    return `${name} | ${date.toDateString()} : ${statusText}`;
}

let tooltipTimeout = null;

function showTooltip(element, name, date, status) {
    clearTimeout(tooltipTimeout);
    const toolTipDiv = document.getElementById("tooltip");

    document.getElementById("tooltipDateTime").innerText = date.toDateString();
    document.getElementById("tooltipDescription").innerText =
        getStatusDescriptiveText(status);

    const statusDiv = document.getElementById("tooltipStatus");
    statusDiv.innerText = getStatusText(status);
    statusDiv.className = status;

    toolTipDiv.style.top = "" + (element.offsetTop + element.offsetHeight + 10);
    toolTipDiv.style.left = "" + (element.offsetLeft + (element.offsetWidth / 2) - toolTipDiv.offsetWidth / 2);
    toolTipDiv.style.opacity = "1";
}

function hideTooltip() {
    tooltipTimeout = setTimeout(() => {
        const toolTipDiv = document.getElementById("tooltip");
        toolTipDiv.style.opacity = "0";
    }, 1000);
}

async function genAllReports() {
    for (let ii = 0; ii < endpoints.length; ii++) {
        const endpoint = endpoints[ii];
        await genReportLog(document.getElementById("reports"), endpoint);
    }
}
