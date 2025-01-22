export function EmailCategories() {

    const cat = ['read', 'unread', 'trash']

    return <div className="categories-list flex column align-center justify-center">
        
        {
            cat.map((cat) => {
                return <div className="category">
                    {cat}
                </div>
            })
        }
    </div>
}