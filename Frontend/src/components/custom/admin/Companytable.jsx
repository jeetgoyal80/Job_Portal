import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/redux/store';
import { EndPointUserURLCOMPANY } from '@/utils/constant';
import axios from 'axios';
import { setcompanies } from '@/redux/companySlice';


const Companytable = () => {
    const companies = useSelector(store => store.company.companies) || [];
    const user = useSelector(store => store.auth.user);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(() => {
        const fetchAppliedcompanies = async () => {
            try {
                const res = await axios.get(`${EndPointUserURLCOMPANY}/getAll`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setcompanies(res.data.companies));
                }
            } catch (error) {
                console.error('Failed to fetch applied jobs:', error);
            }
        };

        fetchAppliedcompanies();
    }, [user._id, dispatch]);

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search companies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <Link to='/company-register'> <Button className="bg-[#d05d28] hover:bg-[#b74c1f] text-white">New Company</Button></Link>

            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50 text-gray-600 uppercase">
                        <tr>
                            <th className="px-4 py-3">Logo</th>
                            <th className="px-4 py-3">Company Name</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredCompanies.map((company) => (
                            <tr key={company.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <img src={company.logo} alt="logo" className="h-10 w-10 rounded-full object-cover" />
                                </td>
                                <td className="px-4 py-3 font-medium">{company.name}</td>
                                <td className="px-4 py-3">{company.
                                    createdAt.split('T')[0]}</td>
                                <td className="px-4 py-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="w-5 h-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                           <Link to={`/company-edit/${company._id}`}><DropdownMenuItem>Edit</DropdownMenuItem></Link> 
                                           <Link to={`/admin/jobs/${company._id}`}> <DropdownMenuItem>View jobs</DropdownMenuItem></Link>
                                           

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                        {filteredCompanies.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-500">
                                    No companies found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Companytable;
