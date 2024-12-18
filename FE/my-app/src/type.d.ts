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

interface IAdminFunction {
    ID?: number // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}

interface IAdminFunctionWithIndex {
    INDEX: number
    ID?: number // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}

interface IAdminFunctionWithKey {
    KEY?: number
    ID?: number // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}

interface ICreateAdminFunction {
    ID?: string // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}

interface IUpdateAdminFunction {
    ID?: string // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}

interface IUser {
    id: number
    username: string
    firstName: string
    lastName: string
    token: string
}

// Định nghĩa kiểu cho `user`
interface User {
    id: string;
    name: string;
    token: string;
}

interface UserLogin {
    username: string;
    password: string;
}

interface IdRequest {
    id: string;
}

// Định nghĩa kiểu cho state
type UserState = {
    user: User | null;
    error: Error | null;
    pending: boolean;
}

type PrivateRouteProps = {
    children: ReactNode;
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

type AdminFunctionState = {
    adminFunctions: IAdminFunction[]
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

type FieldType = {
    name?: string,
    status?: string
}

type HistoryType = {
    navigate: NavigateFunction;
    location: Location<any>;
}

type HomeCardProps = {
    title: string;
    value: number;
    icon: ReactNode;
}

type AdminFunctionTableChartProps = {
    dataSource: IAdminFunction[];
    isLoading: boolean;
    labels: string[];
}

type BarChartType = {
    options: ChartOptions<'bar'>;
    data: ChartData<'bar'>;
}

type TableColumnType1 = {
    title: string;
    dataIndex: string;
}

type TableColumnType2 = {
    title: string;
    dataIndex: string;
    align?: string;
    editable?: boolean;
}

interface EditableCellProps {
    editable: boolean;
    dataIndex: keyof IAdminFunctionWithKey;
    title: React.ReactNode;
    record: IAdminFunctionWithKey;
    children: React.ReactNode;
}

// Kiểu hàm
type DispatchType = (args: ArticleAction) => ArticleAction

type EmployeeDispatchType = (args: EmployeeAction) => EmployeeAction

type UserReducerType = {
    logout: (args: UserState) => void;
}

type ExtraReducersType = (builder: any) => void;


