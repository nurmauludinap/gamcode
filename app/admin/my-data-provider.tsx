import { DataProvider, fetchUtils, GetListParams, GetListResult } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = '/api'; // Assuming your Next.js API is at this base URL
const httpClient = fetchUtils.fetchJson;

// Get the default simpleRestProvider
const restProvider = simpleRestProvider(apiUrl, httpClient);

const myDataProvider: DataProvider = {
    // Custom getList function
    getList: async (resource: string, params: GetListParams): Promise<GetListResult> => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        
        const query = {
            sort: JSON.stringify([field, order]),
            page: page,          // Use `page` and `limit` to match your backend API
            limit: perPage,
            filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
        const response = await httpClient(url);

        const contentRange = response.headers.get('Content-Range');
        const total = contentRange ? parseInt(contentRange.split('/').pop() || '0', 10) : 0;

        return {
            data: (await response.json).map((item: any) => ({ ...item, id: item.id })), // Ensure the 'id' field exists
            total: total,
        };
    },

    getOne: restProvider.getOne,
    getMany: restProvider.getMany,
    getManyReference: restProvider.getManyReference,
    update: restProvider.update,
    updateMany: restProvider.updateMany,
    create: restProvider.create,
    delete: restProvider.delete,
    deleteMany: restProvider.deleteMany,
};

export default myDataProvider;
