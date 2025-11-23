// ====================================================================
// PAGINATION COMPONENT
// ====================================================================
// Reusable pagination functionality component
// Implements DRY principle by centralizing pagination-related logic
// ====================================================================

export class PaginationComponent {
    constructor(page) {
        this.page = page;
        
        // ==================== PAGINATION ELEMENTS ====================
        this.paginationNextButton = page.locator('a[aria-label="Next"]');
        this.paginationPreviousButton = page.locator('a[aria-label="Previous"]');
        this.paginationContainer = page.locator(".pagination");
        this.pageNumberLinks = page.locator(".pagination .page-item:not(.previous):not(.next) .page-link");
    }

    // ==================== PAGINATION NAVIGATION METHODS ====================

    /**
     * Check if next page is available
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {boolean} True if next page exists and is enabled
     */
    async hasNextPage(timeout = 10000) {
        const buttonCount = await this.paginationNextButton.count();
        if (buttonCount === 0) return false;

        await this.paginationNextButton.waitFor({
            state: "visible",
            timeout,
        });
        const isDisabled = await this.paginationNextButton.evaluate((el) =>
            el.closest("li")?.classList.contains("disabled")
        );
        return !isDisabled;
    }

    /**
     * Check if previous page is available
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {boolean} True if previous page exists and is enabled
     */
    async hasPreviousPage(timeout = 10000) {
        const buttonCount = await this.paginationPreviousButton.count();
        if (buttonCount === 0) return false;

        await this.paginationPreviousButton.waitFor({
            state: "visible",
            timeout,
        });
        const isDisabled = await this.paginationPreviousButton.evaluate((el) =>
            el.closest("li")?.classList.contains("disabled")
        );
        return !isDisabled;
    }

    /**
     * Navigate to next page of results
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @throws {Error} If next page button is disabled
     */
    async clickNextPage(timeout = 10000) {
        const canNavigate = await this.hasNextPage(timeout);
        if (!canNavigate) {
            throw new Error("Next page button is disabled - cannot navigate");
        }

        await this.paginationNextButton.click();
    }

    /**
     * Navigate to previous page of results
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @throws {Error} If previous page button is disabled
     */
    async clickPreviousPage(timeout = 10000) {
        const canNavigate = await this.hasPreviousPage(timeout);
        if (!canNavigate) {
            throw new Error("Previous page button is disabled - cannot navigate");
        }

        await this.paginationPreviousButton.click();
    }

    /**
     * Navigate to specific page number
     * @param {number} pageNumber - Page number to navigate to
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    async clickPageNumber(pageNumber, timeout = 10000) {
        const pageLink = this.page.locator(`.pagination .page-link:has-text("${pageNumber}")`);
        await pageLink.waitFor({ state: "visible", timeout });
        await pageLink.click();
    }

    // ==================== PAGINATION INFORMATION METHODS ====================

    /**
     * Get the number of pagination pages available
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {number} Count of pagination pages (excluding Previous and Next buttons)
     */
    async getPageCount(timeout = 10000) {
        await this.paginationContainer.waitFor({ state: "visible", timeout });
        const paginationItems = await this.page
            .locator(".pagination .page-item")
            .count();
        return paginationItems - 2; // Exclude "Previous" and "Next" buttons
    }

    /**
     * Get current page number
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {number} Current page number
     */
    async getCurrentPageNumber(timeout = 10000) {
        await this.paginationContainer.waitFor({ state: "visible", timeout });
        const activePage = this.page.locator(".pagination .page-item.active .page-link");
        
        if (await activePage.count() === 0) {
            return 1; // Default to page 1 if no active page found
        }
        
        const pageText = await activePage.textContent();
        return parseInt(pageText, 10);
    }

    /**
     * Get all available page numbers
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {number[]} Array of available page numbers
     */
    async getAvailablePageNumbers(timeout = 10000) {
        await this.paginationContainer.waitFor({ state: "visible", timeout });
        const pageCount = await this.pageNumberLinks.count();
        const pageNumbers = [];
        
        for (let i = 0; i < pageCount; i++) {
            const pageText = await this.pageNumberLinks.nth(i).textContent();
            pageNumbers.push(parseInt(pageText, 10));
        }
        
        return pageNumbers;
    }

    // ==================== PAGINATION VALIDATION METHODS ====================

    /**
     * Check if pagination is visible
     * @param {number} timeout - Timeout in milliseconds (default: 3000)
     * @returns {boolean} True if pagination is visible
     */
    async isPaginationVisible(timeout = 3000) {
        try {
            await this.paginationContainer.waitFor({ state: "visible", timeout });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if specific page number is active
     * @param {number} pageNumber - Page number to check
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {boolean} True if the specified page is active
     */
    async isPageActive(pageNumber, timeout = 10000) {
        await this.paginationContainer.waitFor({ state: "visible", timeout });
        const activePage = this.page.locator(".pagination .page-item.active .page-link");
        
        if (await activePage.count() === 0) {
            return pageNumber === 1; // Default to page 1 if no active page
        }
        
        const currentPageText = await activePage.textContent();
        return parseInt(currentPageText, 10) === pageNumber;
    }

    /**
     * Check if specific page number exists in pagination
     * @param {number} pageNumber - Page number to check
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {boolean} True if the specified page exists
     */
    async isPageAvailable(pageNumber, timeout = 10000) {
        await this.paginationContainer.waitFor({ state: "visible", timeout });
        const pageLink = this.page.locator(`.pagination .page-link:has-text("${pageNumber}")`);
        return await pageLink.count() > 0;
    }

    // ==================== PAGINATION UTILITY METHODS ====================

    /**
     * Navigate through all pages and execute a callback on each page
     * @param {Function} pageCallback - Function to execute on each page
     * @param {number} maxPages - Maximum number of pages to process (default: 10)
     * @returns {Array} Array of results from each page
     */
    async navigateThroughAllPages(pageCallback, maxPages = 10) {
        const results = [];
        let currentPage = 1;

        while (currentPage <= maxPages) {
            // Execute callback on current page
            const pageResult = await pageCallback(currentPage);
            results.push(pageResult);

            // Check if there's a next page
            const hasNext = await this.hasNextPage();
            if (!hasNext) break;

            // Navigate to next page
            await this.clickNextPage();
            currentPage++;
        }

        if (currentPage >= maxPages) {
            console.warn(`Reached maximum page limit (${maxPages}) - possible infinite loop`);
        }

        return results;
    }

    /**
     * Get total number of items across all pages (estimate)
     * @param {Function} getItemsCountCallback - Function that returns item count on current page
     * @param {number} maxPages - Maximum number of pages to check (default: 10)
     * @returns {number} Estimated total number of items
     */
    async getTotalItemsCount(getItemsCountCallback, maxPages = 10) {
        let totalCount = 0;
        let currentPage = 1;

        while (currentPage <= maxPages) {
            // Get item count on current page
            const pageCount = await getItemsCountCallback();
            totalCount += pageCount;

            // Check if there's a next page
            const hasNext = await this.hasNextPage();
            if (!hasNext) break;

            // Navigate to next page
            await this.clickNextPage();
            currentPage++;
        }

        return totalCount;
    }
}