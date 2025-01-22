export function EmailCategories({ categories }) {

    const names = ['read']
    return <div className="categories-list flex column align-center justify-center">
        {
            names.map((cat) => {
                return <div className="category" key={cat}>
                    <span>{cat}</span><span>{categories[cat]}</span>
                </div>
            })
        }
    </div>
}