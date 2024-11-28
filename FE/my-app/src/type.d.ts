// Global type without importing in other files
// Kiểu dữ liệu
interface IArticle {
    id: number
    title: string
    body: string
}

interface IEmployee {
    idEmployee?: number
    name: string
    age: string
    isActive: int 
}

// Kiểu mảng đối tượng
type ArticleState = {
    articles: IArticle[]
    pending: boolean
    error?: Error
}

type EmployeeState = {
    employees: IEmployee[] 
    pending: boolean
    error?: Error
    searchData?: string
}

// Kiểu đối tượng
type ArticleAction = {
    type: string
    article?: IArticle
    articles?: IArticle[]
    error?: Error
}

type EmployeeAction = {
    type: string
    employee?: IEmployee
    employees?: IEmployee[]
    error?: Error
    searchValue?: string
}

// Kiểu hàm
type DispatchType = (args: ArticleAction) => ArticleAction

type EmployeeDispatchType = (args: EmployeeAction) => EmployeeAction


