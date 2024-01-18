import ReportForm from "../(components)/ReportForm";
import UserReportList from "../(components)/UserReport";
const ClientMember = () => {
  return (
    <div className="flex flex-col  w-full items-center">
      <div className=" max-w-7xl px-10 w-full">
        <ReportForm />
      </div>

        <UserReportList />
    </div>
  );
};

export default ClientMember;
