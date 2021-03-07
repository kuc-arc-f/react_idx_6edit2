// LibCmsEdit
//
export default {
    get_const: function(){
        return {
            DB_NAME: "cms_edit_idx_kuc_db2",
            DB_VERSION: 1,
            DB_STORE: {
                posts: '++id, category_id, save_id , title, content , created_at',
                category: '++id, name, save_id, created_at',
                pages: '++id, save_id , title, content , created_at',
            },
            file_version: 4,
        }
    },


}
